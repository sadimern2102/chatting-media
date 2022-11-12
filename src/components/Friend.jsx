import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { FiMoreVertical } from "react-icons/fi";

const Friend = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [ttlFriends, setTtlFriends] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "friends/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((data) => {
        if (
          auth.currentUser.uid == data.val().receiverId ||
          auth.currentUser.uid == data.val().senderId
        ) {
          arr.push({ ...data.val(), key: data.key });
        }
        setTtlFriends(arr);
      });
    });
  }, []);

  let handleBlock = (item) => {
    console.log(item);
    if (auth.currentUser.uid == item.senderId) {
      set(push(ref(db, "blockUser/")), {
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName,
        receiverId: item.receiverId,
        receiverName: item.receiverName,
      }).then(() => {
        remove(ref(db, "friends/" + item.key));
      });
    } else if (auth.currentUser.uid == item.receiverId) {
      set(push(ref(db, "blockUser/")), {
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName,
        receiverId: item.senderId,
        receiverName: item.senderName,
      }).then(() => {
        remove(ref(db, "friends/" + item.key));
      });
    }
  };

  return (
    <div>
      <div className="p-6 rounded-md shadow-xl h-[475px] lg:mt-0 mt-5 overflow-y-scroll">
        <div className="head flex">
          <div className="text w-1/2">
            <h2 className="text-xl text-black font-bold font-nunito  ">
              Friends
            </h2>
          </div>
          <div className="dot w-1/2 text-right">
            <FiMoreVertical className="text-xl text-[#5F35F5] inline-block"></FiMoreVertical>
          </div>
        </div>
        <div className="group ">
          {ttlFriends.map((item) => (
            <div className="items last:border-none last:pb-0  mt-4 border-b-[1px] border-b-[#4D4D4DBF] border-solid pb-3 flex">
              <div className="one w-[20%] ">
                <picture>
                  <img
                    className="w-[52px] h-[52px] rounded-full mx-auto "
                    src="assets/images/friend1.png"
                    alt=""
                  />
                </picture>
              </div>
              <div className="two w-[55%] my-auto ml-2">
                {auth.currentUser.uid == item.senderId ? (
                  <h2 className="text-base font-nunito font-bold ">
                    {item.receiverName}
                  </h2>
                ) : (
                  <h2 className="text-base font-nunito font-bold ">
                    {item.senderName}
                  </h2>
                )}

                <p className="text-[12px] font-nunito font-normal text-[#4D4D4DBF]">
                  Dinner?
                </p>
              </div>
              <div className="three w-[25%] my-auto ">
                <button
                  onClick={() => handleBlock(item)}
                  className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md "
                >
                  <a href="#">Block</a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friend;
