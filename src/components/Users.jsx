import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { BiPlusMedical } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const Users = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [ttlUser, setTtlUser] = useState([]);
  let [frindsReq, setFriendsReq] = useState([]);
  let [frinds, setFriends] = useState([]);
  let [block, setblock] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((data) => {
        if (data.val().id !== auth.currentUser.uid) {
          arr.push(data.val());
          console.log(data.val());
        }
        setTtlUser(arr);
      });
    });
  }, []);

  let handleRequestSent = (id, name) => {
    set(push(ref(db, "friendRequest/")), {
      senderId: auth.currentUser.uid,
      senderName: auth.currentUser.displayName,
      receiverId: id,
      receivername: name,
    });
  };

  useEffect(() => {
    const requestRef = ref(db, "friendRequest/");
    onValue(requestRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((data) => {
        reqArr.push(data.val().receiverId + data.val().senderId);
        setFriendsReq(reqArr);
      });
    });
  }, []);

  useEffect(() => {
    const requestRef = ref(db, "friends/");
    onValue(requestRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((data) => {
        reqArr.push(data.val().receiverId + data.val().senderId);
        setFriends(reqArr);
      });
    });
  }, []);
  useEffect(() => {
    const requestRef = ref(db, "blockUser/");
    onValue(requestRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((data) => {
        blockArr.push(data.val().receiverId + data.val().senderId);
        setblock(blockArr);
      });
    });
  }, []);

  return (
    <div>
      <div className="p-6 rounded-md shadow-xl h-[475px]  overflow-y-scroll">
        <div className="head flex">
          <div className="text w-1/2">
            <h2 className="text-xl text-black font-bold font-nunito  ">
              User List
            </h2>
          </div>
          <div className="dot w-1/2 text-right">
            <FiMoreVertical className="text-xl text-[#5F35F5] inline-block"></FiMoreVertical>
          </div>
        </div>
        <div className="group ">
          {ttlUser.map((item) => (
            <div className="items last:border-none last:pb-0  mt-4 border-b-[1px] border-b-[#4D4D4DBF] border-solid pb-3 flex">
              <div className="one w-[20%] ">
                <picture>
                  <img
                    className="w-[52px] h-[52px] rounded-full mx-auto"
                    src={item.profile_picture}
                    alt=""
                  />
                </picture>
              </div>
              <div className="two w-[55%] my-auto ml-2">
                <h2 className="text-base font-nunito font-bold ">
                  {item.username}
                </h2>
                <p className="text-[12px] font-nunito font-normal text-[#4D4D4DBF]">
                  Dinner?
                </p>
              </div>
              <div className="three w-[25%] my-auto ">
                {frindsReq.includes(item.id + auth.currentUser.uid) ||
                frindsReq.includes(auth.currentUser.uid + item.id) ? (
                  <button className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md ">
                    <a href="#">Sent</a>
                  </button>
                ) : frinds.includes(item.id + auth.currentUser.uid) ||
                  frinds.includes(auth.currentUser.uid + item.id) ? (
                  <button className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md ">
                    <a href="#">Frind</a>
                  </button>
                ) : block.includes(item.id + auth.currentUser.uid) ||
                  block.includes(auth.currentUser.uid + item.id) ? (
                  <button className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md ">
                    <a href="#">Block</a>
                  </button>
                ) : (
                  <button className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md ">
                    <a href="#">
                      <BiPlusMedical
                        onClick={() =>
                          handleRequestSent(item.id, item.username)
                        }
                      ></BiPlusMedical>
                    </a>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
