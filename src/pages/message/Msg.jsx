import React from "react";
import FriendRequest from "../../components/FriendRequest";
import Group from "../../components/Group";
import Search from "../../components/Search";
import SideBar from "../../components/SideBar";

const Msg = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 p-5 lg:p-8">
      <div className="lg:flex">
        <div className="sidebar lg:w-[27%]">
          <SideBar active="message"></SideBar>
        </div>
        <div className="items lg:w-[73%] lg:pl-[40px] lg:pr-4">
          <Search></Search>
          <Group></Group>
          <FriendRequest></FriendRequest>
        </div>
      </div>
      <div className="lg:flex lg:gap-x-3">
        <div className="one lg:w-1/2"></div>
        <div className="two lg:w-1/2"></div>
      </div>
    </div>
  );
};

export default Msg;
