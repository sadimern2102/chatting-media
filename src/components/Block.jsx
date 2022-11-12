import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { BiPlusMedical } from "react-icons/bi";
import {
  ref,
  onValue,
  push,
  remove,
  set,
  getDatabase,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const Block = () => {
  let [block, setblock] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const requestRef = ref(db, "blockUser/");
    onValue(requestRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((data) => {
        if (data.val().senderId == auth.currentUser.uid) {
          reqArr.push({ ...data.val(), id: data.key });
        }
        setblock(reqArr);
      });
    });
  }, []);

  let handleBlockIcon = (item) => {
    set(push(ref(db, "friends/")), {
      senderName: item.senderName,
      senderId: item.senderId,
      receiverId: item.receiverId,
      receiverName: item.receiverName,
      keyId: item.id,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "blockUser/" + item.id));
    });
  };

  return (
    <div>
      <div className="p-6 rounded-md shadow-xl h-[450px] mt-[35px] overflow-y-scroll">
        <div className="head flex">
          <div className="text w-1/2">
            <h2 className="text-xl text-black font-bold font-nunito">
              Block User
            </h2>
          </div>
          <div className="dot w-1/2 text-right">
            <FiMoreVertical className="text-xl text-[#5F35F5] inline-block"></FiMoreVertical>
          </div>
        </div>
        <div className="group ">
          {block.map((item) => (
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
                <h2 className="text-base font-nunito font-bold ">
                  {item.receiverName}
                </h2>
                <p className="text-[12px] font-nunito font-normal text-[#4D4D4DBF]">
                  Dinner?
                </p>
              </div>
              <div className="three w-[25%] my-auto ">
                <button
                  onClick={() => handleBlockIcon(item)}
                  className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md "
                >
                  <a href="#">
                    <BiPlusMedical></BiPlusMedical>
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Block;
