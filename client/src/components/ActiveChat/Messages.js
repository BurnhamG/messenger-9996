import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
}));

const isLastRead = (messages, messageId) => {
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
            {isLastRead(messages, message.id) &&
              <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.root} ></Avatar> 
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
