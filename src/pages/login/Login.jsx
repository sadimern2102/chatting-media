import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { active_user } from "../../reucer/Reducer";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPass] = useState("");
  let [err, setErr] = useState("");
  let [passErr, setpassErr] = useState("");
  let [emailErr, setEmailErr] = useState("");
  let [forgot, setForgot] = useState(false);
  let [forgotEmail, setForgotEmail] = useState("");
  const dispatch = useDispatch();
  let state = useSelector((state) => state.user.user);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const user = auth.currentUser;
  let navigate = useNavigate();

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setErr("");
    setEmailErr("");
  };

  let handlePass = (e) => {
    setPass(e.target.value);
    setErr("");
    setpassErr("");
  };

  let handleForgotPass = (e) => {
    setForgotEmail(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErr("Please fill all the field");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch(active_user(userCredential.user));
          navigate("/");
          localStorage.setItem("userInfo", JSON.stringify(userCredential.user));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode.includes("auth/wrong-password")) {
            setpassErr("Password does not match,Please give correct password");
          }
          if (errorCode.includes("auth/user-not-found")) {
            setEmailErr("This email in not connected to an account");
          }
        });
    }
  };
  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user, "From google");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
      });
  };
  let handleForgot = () => {
    setForgot(true);
  };

  let handleForgotSubmit = () => {
    sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        setForgot(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div>
      {forgot ? (
        <div className="modal absolute h-screen w-screen bg-purple-700 z-50 flex">
          <div className="box mx-auto my-auto w-[400px] bg-white rounded-md shadow-lg p-3">
            <h2 className="text-center text-purple-900 text-2xl font-bold uppercase">
              Give Your New Password
            </h2>
            <input
              className=" border-[1px] mt-5 border-[#9799B8]  text-lg font-normal py-4 xl:py-5  px-6 border-solid rounded-lg w-full inline-block  "
              type="email"
              placeholder="Give Your Reset Email"
              onChange={handleForgotPass}
            />
            <div className="btn text-center">
              <button
                onClick={handleForgotSubmit}
                className="group px-5 py-2 font-normal text-base my-5 border-2 border-solid bg-blue-700 border-transparent rounded-[10px] relative duration-1000"
              >
                <a href="#" className="inline-block text-lg text-white">
                  Submit
                </a>
              </button>
              <button
                onClick={handleSubmit}
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
      <div className="md:grid md:grid-cols-2 xl:w-screen h-screen font-nunito">
        <div className="flex xl:justify-end">
          <div className="xl:w-[550px]  my-auto text-center xl:text-left p-7 xl:p-0">
            <h1 className="text-[#11175D] text-[35px] leading-[33px] xl:leading-0 mt-5 xl:mt-0 font-bold ">
              Login to your account
            </h1>
            {err && (
              <h2 className="xl:w-[380px] bg-red-700 text-white rounded-sm p-2 my-2">
                {err}
              </h2>
            )}
            <button
              onClick={handleGoogle}
              className="px-8 active:bg-black active:text-white duration-1000 py-5 border-[1px] border-solid border-[#9799B8] rounded-lg mt-7 mb-5"
            >
              <a href="#">
                <img
                  className="inline-block"
                  src="assets/images/google.png"
                  alt="google.png"
                />
              </a>
              <a
                className="font-semibold text-black text-sm ml-2 inline-block"
                href="#"
              >
                Log in with google
              </a>
            </button>
            <div className="xl:w-[75%] w-full mx-auto xl:mx-0">
              <div className="relative mt-4 xl:mt-8">
                <input
                  className="focus:outline-none border-b-[1px] border-[#9799B8]  text-lg placeholder:text-black placeholder:font-semibold placeholder:text-lg font-normal py-4 xl:py-5  px-1 border-solid w-full inline-block  "
                  type="email"
                  placeholder="sadi@gmail.com"
                  onChange={handleEmail}
                />
                {emailErr && (
                  <h2 className="xl:w-[380px] bg-red-700 text-white rounded-sm p-2 my-2">
                    {emailErr}
                  </h2>
                )}
                <p className="text-[14px] text-[#9799B8] absolute top-[-11px] left-[0] inline-block">
                  Email Address
                </p>
              </div>
              <div className="relative mt-4 xl:mt-16">
                <input
                  className="focus:outline-none border-b-[1px] border-[#9799B8]  text-lg placeholder:text-black placeholder:font-semibold placeholder:text-lg font-normal py-4 xl:py-5  px-1 border-solid w-full inline-block  "
                  type="Password"
                  placeholder="s1D@sad%"
                  onChange={handlePass}
                />
                {passErr && (
                  <h2 className="xl:w-[380px] bg-red-700 text-white rounded-sm p-2 my-2">
                    {passErr}
                  </h2>
                )}
                <p className="text-[14px] text-[#9799B8] absolute top-[-11px] left-[0] inline-block">
                  Password
                </p>
              </div>
              <div className="mt-7 xl:mt-12 text-center xl:text-left">
                <button
                  onClick={handleSubmit}
                  className="group px-[20px] xl:px-[90px] py-2  xl:py-5 font-normal text-base my-5 border-2 border-solid bg-[#5F35F5] border-transparent rounded-[10px] relative duration-1000 hover:bg-purple-600"
                >
                  <a href="#" className="inline-block text-lg text-white">
                    Login To Your Account
                  </a>
                </button>
              </div>
              <div className="text-center xl:text-left">
                <a
                  onClick={handleForgot}
                  className="text-blue-600 font-xl font-semibold my-3 block"
                  href="#"
                >
                  Forgot Password?
                </a>
                <p className="inline-block">
                  Don't have an account?{" "}
                  <Link className="text-indigo-700" to={"/register"}>
                    Register
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
              src="assets/images/login.png"
              alt=""
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Login;
