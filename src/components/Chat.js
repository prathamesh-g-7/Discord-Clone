import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import { selectUser } from "../features/userSlice";
import db from "../Firebase/firebase";
import firebase from "firebase";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const user = useSelector(selectUser);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
  }, [channelId]);

  const sendMsg = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {channelId ? (
          messages.map((msg) => (
            <Message
              timestamp={msg?.timestamp?.toDate().toUTCString()}
              message={msg?.message}
              name={msg.user?.displayName}
              photo={msg.user?.photoURL}
            />
          ))
        ) : (
          <h3 className="entry__message">
            No Channel Selected, Select or Create a Channel for Enjoying
            Chatting.
          </h3>
        )}
      </div>

      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form action="">
          <input
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`message # ${channelName}`}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMsg}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
