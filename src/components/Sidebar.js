import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  ExpandMore,
  Add,
  SignalCellularAlt,
  InfoOutlined,
  Call,
  Mic,
  Headset,
  Settings,
  Menu,
  Close,
} from "@material-ui/icons";
import SidebarChannel from "./SidebarChannel";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../Firebase/firebase";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    db.collection("channels").onSnapshot((snap) =>
      setChannels(
        snap.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  const toggle = () => {
    let headerMenu = document.getElementById("h");
    headerMenu.classList.toggle("active");

    setIsOpen(true);
  };

  const callTwoFunction = () => {
    toggle();
    setIsOpen(false);
  };

  return (
    <div className="extra__sidebar">
      {isOpen && isOpen ? (
        <Close className="header_menuIcon" onClick={() => callTwoFunction()} />
      ) : (
        <Menu className="header_menuIcon" onClick={toggle} />
      )}
      <div className="sidebar" id="h">
        <div className="sidebar__top">
          <h3>
            <img
              className="img"
              src="https://discord.com/assets/ff41b628a47ef3141164bfedb04fb220.png"
              alt=""
            />
          </h3>
          <ExpandMore />
        </div>

        {/* channels */}

        <div className="sidebar__channels">
          <div className="sidebar__channelsHeader">
            <div className="sidebar__header">
              <ExpandMore />
              <h4>Text Channels</h4>
            </div>
            <Add onClick={handleAddChannel} className="sidebar__addChannel" />
          </div>

          {/* channels List */}

          <div className="sidebar__chanelsList">
            {channels.map((ch) => (
              <SidebarChannel
                key={ch.id}
                id={ch.id}
                channel={ch.channel.channelName}
              />
            ))}
            {/* <SidebarChannel />
          <SidebarChannel />
          <SidebarChannel /> */}
          </div>
        </div>

        {/* sidebar voice */}

        <div className="sidebar__voice">
          <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />
          <div className="sidebar__voiceInfo">
            <h3>Voice Connected</h3>
            <p>Stream</p>
          </div>

          <div className="sidebar__voiceIcons">
            <InfoOutlined />
            <Call />
          </div>
        </div>

        <div className="sidebar__profile">
          <Avatar src={user.photo} />
          <div className="sidebar__profileInfo">
            <h3>{user?.displayName}</h3>
            <p>#{user.uid.substring(0, 6)}</p>
          </div>

          <div className="sidebar__profileIcons">
            <Mic />
            <Headset />
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
