import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import SideBar from "../../components/SideBar";
import Group from "../../components/Group";
import FriendRequest from "../../components/FriendRequest";
import Friend from "../../components/Friend";
import MyGroups from "../../components/MyGroups";
import Users from "../../components/Users";
import Block from "../../components/Block";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  let navigate = useNavigate();
  const state = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!state) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {state && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 p-5 lg:p-8">
          <div className="lg:flex">
            <div className="sidebar lg:w-[27%]">
              <SideBar active="home"></SideBar>
            </div>
            <div className="items lg:w-[73%] lg:pl-[40px] lg:pr-4">
              <Search></Search>
              <Group></Group>
              <FriendRequest></FriendRequest>
            </div>
          </div>
          <div className="lg:flex lg:gap-x-3">
            <div className="one lg:w-1/2">
              <Friend></Friend>
              <MyGroups></MyGroups>
            </div>
            <div className="two lg:w-1/2">
              <Users></Users>
              <Block></Block>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
