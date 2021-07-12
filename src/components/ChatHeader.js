import React from "react";
import "./ChatHeader.css";
import {
  Notifications,
  EditLocationRounded,
  PeopleAltRounded,
  SearchRounded,
  SendRounded,
  HelpRounded,
} from "@material-ui/icons";
import { auth } from "../Firebase/firebase";

function ChatHeader({ channelName }) {
  return (
    <div className="extra__head">
      {" "}
      <button className="res__button" onClick={() => auth.signOut()}>
        Sign Out
      </button>
      <div className="chatHeader">
        <div className="chatHeader__left">
          <h3>
            <span className="chatHeader__hash">#</span>
            {channelName}
          </h3>
        </div>
        <div className="chatHeader__right">
          <Notifications />
          <EditLocationRounded />
          <PeopleAltRounded />

          <div className="chatHeader__search">
            <input type="text" placeholder="Search" />
            <SearchRounded />
          </div>

          <SendRounded />
          <HelpRounded />
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
