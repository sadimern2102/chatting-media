import React from "react";
import { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import {
  ref,
  onValue,
  push,
  remove,
  set,
  getDatabase,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const Group = () => {
  let [cGroup, setCgroup] = useState(false);
  let [grpReq, setGrpReq] = useState([]);

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const requestRef = ref(db, "group/");
    onValue(requestRef, (snapshot) => {
      let grpArr = [];
      snapshot.forEach((data) => {
        if (data.val().adminId !== auth.currentUser.uid) {
          grpArr.push({ ...data.val(), id: data.key });
        }
        setGrpReq(grpArr);
        console.log(grpArr);
      });
    });
  }, []);

  const handleJoinreq = (item) => {
    set(push(ref(db, "groupJoinReq/")), {
      joinReqSenderId: auth.currentUser.uid,
      joinReqSenderName: auth.currentUser.displayName,
      groupName: item.groupName,
      groupTag: item.groupTag,
      adminName: item.adminName,
      adminId: item.adminId,
      groupId: item.id,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    });
  };

  return (
    <div>
      <div className="p-6 rounded-md shadow-xl mt-[35px] h-[374px]  overflow-y-scroll">
        <div className="head flex">
          <div className="text w-1/2">
            <h2 className="text-xl text-black font-bold font-nunito  ">
              Groups Request
            </h2>
          </div>
          <div className="dot w-1/2 text-right">
            <FiMoreVertical className="text-xl text-[#5F35F5] inline-block"></FiMoreVertical>
          </div>
        </div>
        <div className="group ">
          {grpReq.map((item) => (
            <div className="items last:border-none last:pb-0  mt-4 border-b-[1px] border-b-[#4D4D4DBF] border-solid pb-3 flex">
              <div className="one w-[20%] ">
                <picture>
                  <img
                    className="w-[70px] h-[70px] rounded-full mx-auto "
                    src="assets/images/group2.png"
                    alt=""
                  />
                </picture>
              </div>
              <div className="two w-[55%] my-auto ml-2">
                <h2 className="text-lg font-nunito font-bold ">
                  {item.groupName}
                </h2>
                <h2 className="text-lg font-nunito font-bold ">
                  Admin : {item.adminName}
                </h2>
                <p className="text-base font-nunito font-normal text-[#4D4D4DBF]">
                  {item.groupTag}
                </p>
              </div>
              <div className="three w-[25%] my-auto ">
                <button
                  onClick={() => handleJoinreq(item)}
                  className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md "
                >
                  <a href="#">Join</a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;
