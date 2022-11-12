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

const MyGroups = () => {
  let [cGroup, setCgroup] = useState(false);
  let [gJoinReq, setgJoinReq] = useState(false);
  let [memberShow, setMemberShow] = useState(false);
  let [gName, setGname] = useState("");
  let [gTag, setGtag] = useState("");
  let [grpReq, setGrpReq] = useState([]);
  let [member, setMember] = useState([]);
  let [joinGroupReq, setJoinGroupReq] = useState([]);

  const auth = getAuth();
  const db = getDatabase();

  const handleGname = (e) => {
    setGname(e.target.value);
  };
  const handleGtag = (e) => {
    setGtag(e.target.value);
  };

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    set(push(ref(db, "group/")), {
      groupName: gName,
      groupTag: gTag,
      adminName: auth.currentUser.displayName,
      adminId: auth.currentUser.uid,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    });
    setCgroup(true);
  };

  const handleGroupCancel = (e) => {
    e.preventDefault();
    setCgroup(true);
  };

  useEffect(() => {
    const requestRef = ref(db, "group/");
    onValue(requestRef, (snapshot) => {
      let grpArr = [];
      snapshot.forEach((data) => {
        if (data.val().adminId == auth.currentUser.uid) {
          grpArr.push({ ...data.val(), id: data.key });
        }
        setGrpReq(grpArr);
        console.log(grpArr);
      });
    });
  }, []);

  let handleInfo = (item) => {
    setgJoinReq(true);
    const requestRef = ref(db, "groupJoinReq/");
    onValue(requestRef, (snapshot) => {
      let joinArr = [];
      snapshot.forEach((data) => {
        if (data.val().groupId == item.id) {
          joinArr.push({ ...data.val(), id: data.key });
        }
        setJoinGroupReq(joinArr);
        console.log(joinArr);
      });
    });
  };

  let handleAccept = (item) => {
    set(push(ref(db, "groupMembers/")), {
      groupName: item.groupName,
      groupTag: item.groupTag,
      groupId: item.groupId,
      groupMember: item.joinReqSenderName,
      groupMemberId: item.joinReqSenderId,
      acceptByName: item.adminName,
      acceptByid: item.adminId,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "groupJoinReq/" + item.id));
    });
  };

  let handleMember = (item) => {
    setMemberShow(true);
    const requestRef = ref(db, "groupMembers/");
    onValue(requestRef, (snapshot) => {
      let memberArr = [];
      snapshot.forEach((data) => {
        if (data.val().groupId == item.id) {
          memberArr.push({ ...data.val(), id: data.key });
        }
        setMember(memberArr);
        console.log(memberArr);
      });
    });
  };

  return (
    <div>
      <div className="p-6 rounded-md shadow-xl mt-[35px] h-[450px]  overflow-y-scroll relative">
        <div className="head flex">
          <div className="text w-1/2">
            <h2 className="text-xl text-black font-bold font-nunito  ">
              My Groups
            </h2>
          </div>
          <div className="dot w-1/2 text-right">
            {cGroup ? (
              <button
                onClick={() => setCgroup(false)}
                className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md "
              >
                Create Group
              </button>
            ) : (
              <button
                onClick={() => setCgroup(true)}
                className="text-xl font-nunito font-bold text-white bg-[#5F35F5] px-2 py-1 rounded-md "
              >
                Prev
              </button>
            )}
          </div>
        </div>
        {gJoinReq && (
          <div className="group absolute top-0 left-0 w-full h-full bg-indigo-600 z-50 p-2">
            <div className="relative">
              <h2 className="text-2xl text-white text-center font-nunito font-bold my-3">
                Group Join Request
              </h2>
              <button
                onClick={() => setgJoinReq(false)}
                className="text-white absolute top-0 right-0 text-2xl "
              >
                X
              </button>
            </div>
            {joinGroupReq.map((item) => (
              <>
                <div className="items bg-white text-black py-3 rounded-sm last:border-none last:pb-0  mt-4 border-b-[1px] border-b-[#4D4D4DBF] border-solid flex">
                  <div className="one w-[20%] ">
                    <picture>
                      <img
                        className="w-[52px] h-[52px] rounded-full mx-auto"
                        src="assets/images/friend1.png"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="two w-[45%] my-auto ml-2">
                    <h2 className="text-base font-nunito font-bold ">
                      {item.joinReqSenderName}
                    </h2>
                    <p className="text-[12px] font-nunito font-normal text-[#4D4D4DBF]">
                      {item.groupName}
                    </p>
                  </div>
                  <div className="three w-[35%] my-auto ">
                    <button
                      onClick={() => handleAccept(item)}
                      className="px-0 py-0 font-normal text-base text-white my-2 border-2 border-solid bg-blue-700 border-transparent rounded-md relative duration-1000"
                    >
                      Accept
                    </button>
                    <button className="px-0 py-0 ml-1 font-normal text-base text-white my-2 border-2 border-solid bg-red-700 border-transparent rounded-md relative duration-1000">
                      Reject
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
        {memberShow && (
          <div className="group absolute top-0 left-0 w-full h-full bg-indigo-600 z-50 p-2">
            <div className="relative">
              <h2 className="text-2xl text-white text-center font-nunito font-bold my-3">
                All Members
              </h2>
              <button
                onClick={() => setMemberShow(false)}
                className="text-white absolute top-0 right-0 text-2xl "
              >
                X
              </button>
            </div>
            {member.map((item) => (
              <>
                <div className="items bg-white text-black py-3 rounded-sm last:border-none last:pb-0  mt-4 border-b-[1px] border-b-[#4D4D4DBF] border-solid flex">
                  <div className="one w-[20%] ">
                    <picture>
                      <img
                        className="w-[52px] h-[52px] rounded-full mx-auto"
                        src="assets/images/friend1.png"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="two w-[45%] my-auto ml-2">
                    <h2 className="text-base font-nunito font-bold ">
                      {item.groupMember}
                    </h2>
                    <p className="text-[12px] font-nunito font-normal text-[#4D4D4DBF]">
                      {item.groupName}
                    </p>
                  </div>
                  <div className="three w-[35%] my-auto ">{item.date}</div>
                </div>
              </>
            ))}
          </div>
        )}
        {cGroup ? (
          grpReq.map((item) => (
            <div className="group ">
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
                <div className="two w-[45%] my-auto ml-2">
                  <h2 className="text-base font-nunito font-bold ">
                    {item.groupName}
                  </h2>
                  <p className="text-[12px] font-nunito font-normal text-[#4D4D4DBF]">
                    {item.groupTag}
                  </p>
                </div>
                <div className="three w-[35%] my-auto ">
                  <button
                    onClick={() => handleInfo(item)}
                    className="px-0 py-0 font-normal text-base text-white my-2 border-2 border-solid bg-blue-700 border-transparent rounded-md relative duration-1000"
                  >
                    <a href="#">Info</a>
                  </button>
                  <button
                    onClick={() => handleMember(item)}
                    className="px-0 py-0 ml-1 font-normal text-base text-white my-2 border-2 border-solid bg-blue-700 border-transparent rounded-md relative duration-1000"
                  >
                    Mrmber
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="box mx-auto my-auto w-[300px] bg-white rounded-md p-3">
            <h2 className="text-center text-purple-900 text-xl font-bold uppercase">
              Give Your New Password
            </h2>
            <input
              className=" border-[1px] mt-2 border-[#9799B8]  text-base font-normal py-2 xl:py-2  px-2 border-solid rounded-lg w-full inline-block  "
              type="text"
              placeholder="Give Your Group Name"
              onChange={handleGname}
            />
            <input
              className=" border-[1px] mt-2 border-[#9799B8]  text-base font-normal py-2 xl:py-2  px-2 border-solid rounded-lg w-full inline-block  "
              type="text"
              placeholder="Give Your Group tag"
              onChange={handleGtag}
            />
            <div className="btn text-center mt-2">
              <button
                onClick={handleGroupCancel}
                className="group mr-3 px-2 py-1 font-normal text-base my-2 border-2 hover:border-transparent hover:bg-red-700 border-solid border-black text-black rounded-md relative duration-1000"
              >
                <a
                  href="#"
                  className="inline-block text-lg text-black duration-1000 group-hover:text-white "
                >
                  Cancel
                </a>
              </button>
              <button
                onClick={handleGroupSubmit}
                className="px-2 py-1 font-normal text-base my-2 border-2 border-solid bg-blue-700 border-transparent rounded-md relative duration-1000"
              >
                <a href="#" className="inline-block text-base text-white">
                  Submit
                </a>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroups;
