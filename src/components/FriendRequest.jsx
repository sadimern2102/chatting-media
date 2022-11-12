import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendRequest = () => {
  let [frindsReq, setFriendsReq] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const requestRef = ref(db, "friendRequest/");
    onValue(requestRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((data) => {
        if (data.val().receiverId == auth.currentUser.uid) {
          reqArr.push({ ...data.val(), id: data.key });
        }
        setFriendsReq(reqArr);
      });
    });
  }, []);

  let handleFriend = (item) => {
    console.log(item.id);
    set(push(ref(db, "friends/")), {
      senderName: item.senderName,
      senderId: item.senderId,
      receiverId: item.receiverId,
      receiverName: item.receivername,
      keyId: item.id,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.id));
    });
  };

  return (
    <div>
      <div className="p-6 rounded-md shadow-xl mt-[35px] h-[450px]  overflow-y-scroll">
        <div className="head flex">
          <div className="text w-1/2">
            <h2 className="text-xl text-black font-bold font-nunito  ">
              Friend Request
            </h2>
          </div>
          <div className="dot w-1/2 text-right">
            <FiMoreVertical className="text-xl text-[#5F35F5] inline-block"></FiMoreVertical>
          </div>
        </div>
        <div className="group ">
          {frindsReq.map((item) => (
            <div
              key={item.id}
              className="items last:border-none last:pb-0  mt-4 border-b-[1px] border-b-[#4D4D4DBF] border-solid pb-3 flex"
            >
              <div className="one w-[20%] ">
                <picture>
                  <img
                    className="w-[70px] h-[70px] rounded-full mx-auto "
                    src="assets/images/friend1.png"
                    alt=""
                  />
                </picture>
              </div>
              <div className="two w-[55%] my-auto ml-2">
                <h2 className="text-lg font-nunito font-bold ">
                  {item.senderName}{" "}
                </h2>
                <p className="text-base font-nunito font-normal text-[#4D4D4DBF]">
                  Dinner?
                </p>
              </div>
              <div className="three w-[25%] my-auto ">
                <button
                  onClick={() => handleFriend(item)}
                  className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md "
                >
                  <a href="#">Accept</a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
