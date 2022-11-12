import React from "react";
import { BiSearch } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";

const Search = () => {
  return (
    <div className="relative">
      <input
        className=" w-full border-[1px] border-transparent shadow-xl border-solid  pl-[78px] py-5 pr-6 rounded-2xl outline-[#5F35F5]"
        type="text"
        placeholder="Search"
      />
      <BiSearch className="text-xl absolute top-1/2 left-6 -translate-y-1/2"></BiSearch>
      <FiMoreVertical className="text-xl text-[#5F35F5] absolute top-1/2 right-6 -translate-y-1/2"></FiMoreVertical>
    </div>
  );
};

export default Search;
