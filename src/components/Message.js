import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ timestamp, message, name, photo }) {
  return (
    <div className="message">
      <Avatar src={photo} />
      <div className="message__info">
        <h4>
          {name}
          <span className="message__timestamp">
            {/* {new Date(timestamp?.toDate().toUTCString())} */}
            {timestamp}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
