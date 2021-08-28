import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  avatar: {
    width: 20,
    height: 20
  }
}));

const isLastRead = (messages, messageId, userId) => {
  for (let index = messages.length - 1; index >= 0; index--) {
    if (messages[index].isRead && messages[index].id === messageId) {
      return true;
    } else if (messages[index].isRead) {
      return false;
    }
  };
};

const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <>
            <SenderBubble key={message.id} text={message.text} time={time} />
            {isLastRead(messages.filter((message) => message.senderId === userId), message.id, userId) &&
            <Box className={classes.root}>
              <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar} ></Avatar> 
            </Box>
            }
          </>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
