import React from "react";
import SideBar from "../../components/SideBar";

const Notification = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 h-screen p-8">
        <div className="flex">
          <div className="sidebar w-[27%]">
            <SideBar active="notification"></SideBar>
          </div>
          <div className="items w-[73%] bg-black"></div>
        </div>
        <div className="bg-indigo-600">two</div>
      </div>
    </div>
  );
};

export default Notification;
