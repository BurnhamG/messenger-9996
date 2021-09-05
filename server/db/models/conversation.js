const { Op } = require("sequelize");
const db = require("../db");
const Conversation = db.define("conversation", {});
const User = require("./user.js");

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findAll({
    include: [
      {
        User,
        attributes: ["id", "username", "photoUrl"],
        through: {
          where: {
            id: {
              [Op.or]: [user1Id, user2Id],
            },
          },
        },
      },
    ],
  })
    .then((conversation) => conversation)
    .filter(
      (conversation) =>
        conversation.users.length === 2 &&
        conversation.users.indexOf(user1Id) !== -1 &&
        conversation.users.indexOf(user2Id) !== -1
    );

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
