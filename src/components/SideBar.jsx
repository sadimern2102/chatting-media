import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineExport,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

import "cropperjs/dist/cropper.css";
import { delete_user } from "../reucer/Reducer";

const SideBar = ({ active }) => {
  let [imgUp, setImgUp] = useState(false);
  let [image, setImage] = useState("");
  let [imageName, setImageName] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const state = useSelector((state) => state.user.user);
  const storage = getStorage();
  const storageRef = ref(storage, imageName);

  let navigate = useNavigate();
  const auth = getAuth();
  let dispatch = useDispatch();

  const cropperRef = useRef(null);
  // const onCrop = () => {
  //   const imageElement = cropperRef?.current;
  //   const cropper = imageElement?.cropper;
  //   setCropData(cropper.getCroppedCanvas().toDataURL());
  //   console.log(cropData);
  // };

  let handlehome = () => {
    navigate("/");
  };
  let handleMessage = () => {
    navigate("/message");
  };
  let handleNotification = () => {
    navigate("/notification");
  };
  let handleSetting = () => {
    navigate("/setting");
  };

  let handleUploade = (e) => {
    e.preventDefault();
    setImgUp(true);
  };

  let handleCancel = (e) => {
    e.preventDefault();
    setImgUp(false);
  };

  let handleImage = (e) => {
    setImageName(e.target.files[0].name);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      console.log(image);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("Profile picture updated");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        });
        console.log("Uploaded a data_url string!");
      });
    }
  };
  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(delete_user());
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {imgUp ? (
        <div className="modal absolute h-screen w-screen bg-purple-700 z-50 flex">
          <div className="box mx-auto my-auto w-[400px] bg-white rounded-md shadow-lg p-3 z-50">
            <h2 className="text-center text-purple-900 text-2xl font-bold uppercase">
              Choice a Image
            </h2>

            <input
              className=" border-[1px] mt-5 border-[#9799B8]  text-lg font-normal py-4 xl:py-5  px-6 border-solid rounded-lg w-full inline-block  "
              type="file"
              onChange={handleImage}
            />
            <Cropper
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              // crop={onCrop}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
            <div className="btn text-center">
              <button
                onClick={getCropData}
                className="group px-5 py-2 font-normal text-base my-5 border-2 border-solid bg-blue-700 border-transparent rounded-[10px] relative duration-1000"
              >
                <a href="#" className="inline-block text-lg text-white">
                  Submit
                </a>
              </button>
              <button
                onClick={handleCancel}
                className="group ml-3 px-5 py-2 font-normal text-base my-5 border-2 hover:border-transparent hover:bg-red-700 border-solid border-black text-black rounded-[10px] relative duration-1000"
              >
                <a
                  href="#"
                  className="inline-block text-lg text-black duration-1000 group-hover:text-white "
                >
                  cancel
                </a>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="bg-[#5F35F5] lg:rounded-lg lg:py-9 lg:pb-[88px] flex lg:block p-3 lg:p-0 -z-50">
        <h1 className="text-white text-center font-bold uppercase mb-3">
          {auth.currentUser.displayName}
        </h1>
        <div className="image group duration-1000 relative w-16 h-16 xl:w-[100px] xl:h-[100px] rounded-full border-[1px] overflow-hidden border-solid border-transparent lg:mx-auto">
          <picture>
            <img className="w-full bg-black" src={state.photoURL} alt="" />
          </picture>

          <div className="overlay group-hover:flex duration-700 group-hover:border-[1px] group-hover:border-blue-500 hidden  justify-center items-center w-16 h-16 xl:w-[100px] xl:h-[100px] rounded-full border-[1px] overflow-hidden border-solid border-transparent bg-black absolute top-0 left-0 opacity-70">
            <AiOutlineCloudUpload
              onClick={handleUploade}
              className="text-white text-3xl hover:text-blue-500 duration-700"
            ></AiOutlineCloudUpload>
          </div>
        </div>
        <div className="icons flex lg:block my-auto lg:my-0 ml-auto lg:ml-0 gap-x-2 lg:gap-x-0">
          <div
            className={`${
              active == "home"
                ? " relative before:content-[''] after:hidden lg:after:block before:hidden lg:before:block before:z-50 before:rounded-l-lg before:absolute before:top-[60px] before:right-0 before:w-2 before:h-[88px] before:bg-[#5F35F5] after:content-[''] after:rounded-l-lg  after:absolute after:top-[60px] after:left-[33px] after:w-[161px] after:h-[88px] after:bg-[#FFFFFF] text-[#5F35F5] flex justify-center"
                : "flex justify-center text-[#BAD1FF]"
            }`}
          >
            <AiOutlineHome
              onClick={handlehome}
              className="text-[46px]  inline-block lg:mt-[80px] z-[9999]"
            ></AiOutlineHome>
          </div>
          <div
            className={`${
              active == "message"
                ? "relative after:hidden lg:after:block before:hidden lg:before:block before:content-[''] before:z-50 before:rounded-l-lg before:absolute before:top-[60px] before:right-0 before:w-2 before:h-[88px] before:bg-[#5F35F5] after:content-[''] after:rounded-l-lg after:absolute after:top-[60px] after:left-[33px] after:w-[161px] after:h-[88px] after:bg-[#FFFFFF] text-[#5F35F5] flex justify-center"
                : "flex justify-center text-[#BAD1FF] "
            }`}
          >
            <AiOutlineMessage
              onClick={handleMessage}
              className="text-[46px]  inline-block lg:mt-[80px] z-50"
            ></AiOutlineMessage>
          </div>
          <div
            className={`${
              active == "notification"
                ? "relative after:hidden lg:after:block before:hidden lg:before:block before:content-[''] before:z-50 before:rounded-l-lg lg:before:absolute before:top-[60px] before:right-0 before:w-2 before:h-[88px] before:bg-[#5F35F5] after:content-[''] after:rounded-l-lg lg:after:absolute after:top-[60px] after:left-[33px] after:w-[161px] after:h-[88px] after:bg-[#FFFFFF] text-[#5F35F5] flex justify-center"
                : "flex justify-center text-[#BAD1FF] "
            }`}
          >
            <BsBell
              onClick={handleNotification}
              className="text-[46px]  inline-block lg:mt-[80px] z-50"
            ></BsBell>
          </div>
          <div
            className={`${
              active == "setting"
                ? "relative after:hidden lg:after:block before:hidden lg:before:block before:content-[''] before:z-50 before:rounded-l-lg before:absolute before:top-[60px] before:right-0 before:w-2 before:h-[88px] before:bg-[#5F35F5] after:content-[''] after:rounded-l-lg after:absolute after:top-[60px] after:left-[33px] after:w-[161px] after:h-[88px] after:bg-[#FFFFFF] text-[#5F35F5] flex justify-center"
                : "flex justify-center text-[#BAD1FF] "
            }`}
          >
            <AiOutlineSetting
              onClick={handleSetting}
              className="text-[46px]  inline-block lg:mt-[80px] z-50"
            ></AiOutlineSetting>
          </div>
          <div className="relative text-white flex justify-center">
            <AiOutlineExport
              onClick={handleLogOut}
              className="text-[46px]  inline-block lg:mt-[187px] z-50"
            ></AiOutlineExport>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
