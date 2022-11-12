import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { Circles } from "react-loader-spinner";
import { getDatabase, ref, set, push } from "firebase/database";

const Registration = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [nameerr, setNameErr] = useState("");
  let [emailerr, setEmailErr] = useState("");
  let [passerr, setPassErr] = useState("");
  let [success, setSuccess] = useState("");
  let [loder, setLoader] = useState(false);
  const db = getDatabase();

  const handleName = (e) => {
    setName(e.target.value);
    setNameErr("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassErr("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setNameErr("Please give your full name");
    }
    if (!email) {
      setEmailErr("Please give your email address");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Please give a valid email");
      }
    }
    if (!password) {
      setPassErr("Please give a password");
    }

    // else {
    //   if (!/^(?=.*[a-z])/.test(password)) {
    //     setPassErr("password should contain 1 lower_case char");
    //   } else if (!/^(?=.*[A-Z])/.test(password)) {
    //     setPassErr("password should contain 1 upper_case char");
    //   } else if (!/^(?=.*?[#?!@$%^&*-])/.test(password)) {
    //     setPassErr("password should contain 1 Special char");
    //   }
    // }

    if (name && email && password) {
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "assets/images/profileAvater.webp",
          })
            .then(() => {
              console.log("realtime database");
              set(push(ref(db, "users/")), {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
                id: user.uid,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          // Signed in
          sendEmailVerification(auth.currentUser).then(() => {
            console.log("Mail send");
          });

          setLoader(false);
          setSuccess("Account created successfully! please login");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      console.log("kisui thik nai");
    }
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-2 xl:w-screen h-screen font-nunito">
        <div className="flex xl:justify-end">
          <div className="xl:w-[550px] my-auto text-center xl:text-left ">
            <h1 className="text-[#11175D] text-[35px] leading-[33px] xl:leading-0 mt-5 xl:mt-0 font-bold">
              Get started with easily register
            </h1>
            <p className="text-[#9799B8] font-nunito font-normal text-5 mt-1 md:mt-[13px] ">
              Free register and you can enjoy it
            </p>
            {success && (
              <h2 className="bg-green-700 text-white rounded-sm p-2 my-2 w-[75%]">
                {success}
              </h2>
            )}
            <div className="w-[75%] mx-auto xl:mx-0">
              <div className="relative mt-5 md:mt-12">
                <input
                  onChange={handleName}
                  value={name}
                  className=" border-[1px] border-[#9799B8]  text-lg font-normal py-4 xl:py-5  px-14 border-solid rounded-lg w-full inline-block  "
                  type="text"
                />
                {nameerr && (
                  <h2 className="bg-red-700 text-white rounded-sm p-2 my-2">
                    {nameerr}
                  </h2>
                )}

                <p className="text-[14px] text-[#9799B8] bg-white px-3 absolute top-[-11px] left-[52px] inline-block">
                  Full Name
                </p>
              </div>
              <div className="relative mt-5 md:mt-12">
                <input
                  value={email}
                  onChange={handleEmail}
                  className=" border-[1px] border-[#9799B8]  text-lg font-normal py-4 xl:py-5  px-14 border-solid rounded-lg w-full inline-block  "
                  type="email"
                />
                {emailerr && (
                  <h2 className="bg-red-700 text-white rounded-sm p-2 my-2">
                    {emailerr}
                  </h2>
                )}
                <p className="text-[14px] text-[#9799B8] bg-white px-3 absolute top-[-11px] left-[52px] inline-block">
                  Email Address
                </p>
              </div>
              <div className="relative mt-5 md:mt-12">
                <input
                  value={password}
                  onChange={handlePassword}
                  className=" border-[1px] border-[#9799B8]  text-lg font-normal py-4 xl:py-5  px-14 border-solid rounded-lg w-full inline-block  "
                  type="password"
                />
                {passerr && (
                  <h2 className="bg-red-700 text-white rounded-sm p-2 my-2">
                    {passerr}
                  </h2>
                )}
                <p className="text-[14px] text-[#9799B8] bg-white px-3 absolute top-[-11px] left-[52px] inline-block">
                  Password
                </p>
              </div>

              <div className="mt-7 xl:mt-12 text-center">
                {loder ? (
                  <button
                    disabled
                    onClick={handleSubmit}
                    className=" group flex px-[70px] xl:px-[100px] py-2  xl:py-5 font-normal text-base m-5 border-2 border-solid bg-[#5F35F5] border-transparent rounded-[30px] relative duration-1000 hover:bg-purple-600 hover:border-purple-600 hover:bg-transparent"
                  >
                    <Circles
                      height="40"
                      width="40"
                      color="#fff"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                    <a
                      href="#"
                      className="inline-block text-lg ml-3 text-white"
                    >
                      Sign In
                    </a>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="group flex px-[70px] xl:px-[140px] py-2  xl:py-5 font-normal text-base m-5 border-2 border-solid bg-[#5F35F5] border-transparent rounded-[30px] relative duration-1000 hover:bg-purple-600 hover:border-purple-600 hover:bg-transparent"
                  >
                    <a href="#" className="inline-block text-lg text-white">
                      Sign In
                    </a>
                  </button>
                )}
              </div>
              <div className="text-center">
                <p className="inline-block">
                  Already have an account?{" "}
                  <Link className="text-indigo-700" to={"/login"}>
                    Login
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <picture>
            <img
              className="h-full invisible md:visible xl:h-screen w-full object-cover "
              src="assets/images/img1.png"
              alt=""
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Registration;
