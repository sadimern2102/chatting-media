import React from "react";
import { FiMoreVertical } from "react-icons/fi";

const TextPart = () => {
  return (
    <div>
      <div className="main">
        <div className="items mt-4 border-b-[1px] border-b-[#4D4D4DBF] border-solid pb-3 flex mx-[50px]">
          <div className="one w-[20%] ">
            <picture>
              <img
                className="w-[70px] h-[70px] rounded-full "
                src="assets/images/group2.png"
                alt=""
              />
            </picture>
          </div>
          <div className="two w-[55%] my-auto">
            <h2 className="text-lg font-nunito font-bold ">Friends Reunion</h2>
            <p className="text-base font-nunito font-normal text-[#4D4D4DBF]">
              Hi Guys, Wassup!
            </p>
          </div>
          <div className="three w-[25%] my-auto relative">
            <FiMoreVertical className="text-xl text-[#5F35F5] absolute top-1/2 right-6 -translate-y-1/2"></FiMoreVertical>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPart;
