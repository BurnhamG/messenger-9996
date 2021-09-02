const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

const setLastRead = (messages, userId) => {
  for (let index = messages.length - 1; index >= 0; index--) {
    if (messages[index].isRead && messages[index].senderId === userId) {
      return messages[index].id;
    }
  }
};

const fetchConversation = async (conversationId) => {
  const conversation = await Conversation.findOne({
    where: {
      id: conversationId,
    },
    include: [{ model: Message }],
    order: [[Message, "createdAt", "ASC"]],
  });
  return conversation;
};

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      convoJSON.unreadMessages = convoJSON.messages.filter(
        (message) =>
          !message.isRead && message.senderId === convoJSON.otherUser.id
      ).length;

      // reverse messages so the most recent message is last in the array
      convoJSON.messages.reverse();

      convoJSON.lastReadMessages = {};
      convoJSON.lastReadMessages[convoJSON.otherUser.id] = setLastRead(
        convoJSON.messages,
        userId
      );
      convoJSON.lastReadMessages[userId] = setLastRead(
        convoJSON.messages,
        convoJSON.otherUser.id
      );

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText =
        convoJSON.messages[convoJSON.messages.length - 1].text;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// expects { conversationId, senderId } in body
router.patch("/", async (req, res, next) => {
  try {
    const { conversationId, senderId } = req.body;

    let conversation = await fetchConversation(conversationId);

    // protect against users that are not part of the conversation
    if (
      !req.user ||
      (conversation.user1Id !== senderId && conversation.user2Id !== senderId)
    ) {
      return res.sendStatus(401);
    }

    await Message.update(
      { isRead: true },
      {
        where: {
          conversationId: conversationId,
          senderId: senderId,
          isRead: false,
        },
      }
    );

    const user = await User.findOne({
      where: {
        id: senderId,
      },
      attributes: ["id", "username", "photoUrl"],
    });

    conversation = await fetchConversation(conversationId);
    const convoJSON = conversation.toJSON();
    convoJSON.otherUser = user;
    convoJSON.lastReadMessages = {};
    convoJSON.lastReadMessages[req.user.id] = setLastRead(
      convoJSON.messages,
      senderId
    );
    convoJSON.lastReadMessages[senderId] = setLastRead(
      convoJSON.messages,
      req.user.id
    );

    res.json({ conversation: convoJSON });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
