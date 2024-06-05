import React from "react";
import SideBar from "./components/SideBar";
import ChatWindow from "./components/ChatWindow";

export default function Dashboard({ id }) {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
      <ChatWindow />
    </div>
  );
}
