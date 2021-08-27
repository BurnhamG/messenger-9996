export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.unreadMessages =  newConvo.messages.filter((message) => message.sender.id === newConvo.otherUser.id && !message.isRead).length;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = {...convo }
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.unreadMessages =  convoCopy.messages.filter((message) => message.senderId === convoCopy.otherUser.id && !message.isRead).length;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    const convoCopy = {...convo };
    if (convoCopy.otherUser.id === recipientId) {
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const markStoreMessagesRead = (state, conversationId, senderId) => {
  return state.map((conversation) => {
    if (conversation.id === conversationId) {
      const conversationCopy = {...conversation };
      conversationCopy.messages.filter((message) => message.senderId === senderId).forEach((message) => message.isRead = true);
      if (senderId === conversationCopy.otherUser.id) {
        conversationCopy.unreadMessages = 0;
      }
      return conversationCopy;
    } else {
      return conversation;
    }
  });
};
