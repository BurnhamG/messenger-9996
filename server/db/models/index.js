const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.belongsToMany(Conversation, { through: "ConversationUsers" });
Conversation.belongsToMany(User, { through: "ConversationUsers" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
};
