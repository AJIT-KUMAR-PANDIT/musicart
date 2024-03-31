import style from "./SignUp.module.css";
import logo from "../../images/image1.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUserAsync,
  signupError,
  user,
  userInfoToggle,
  userToggle,
} from "../../Redux/User/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateUserToSignInPage = (route) => {
    navigate(route);
  };
  const userInfo = useSelector(user);
  const toggle = useSelector(userInfoToggle);
  const error = useSelector(signupError);

  const handleSubmit = () => {
    const phonePattern = /^[6-9]\d{9}$/;
    const emailPattern = /\S+@\S+\.\S+/;
    if (!email && !password && !phoneNumber && !nameError) {
      setLoader(false);
      setPasswordError(true);
      setEmailError(true);
      setNameError(true);
      setPhoneNumberError(true);
    } else if (!name) {
      setLoader(false);
      setNameError(true);
    } else if (!email || !emailPattern.test(email)) {
      if (!email) {
        setLoader(false);
        setEmailError(true);
      } else {
        toast.error("Please insert a valid email!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else if (!password) {
      setLoader(false);
      setPasswordError(false);
    } else if (!phoneNumber || !phonePattern.test(phoneNumber)) {
      if (!phoneNumber) {
        setLoader(false);
        setPhoneNumberError(true);
      } else {
        toast.error("Please insert a valid mobile number!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      const userData = {
        name,
        email,
        mobile: phoneNumber,
        password,
      };
      setLoader(true);
      dispatch(registerUserAsync(userData));
    }
  };

  const handleSetUserEmail = (value) => {
    setEmailError(false);
    setEmail(value);
  };
  const handleSetUserPasword = (value) => {
    setPasswordError(false);
    setPassword(value);
  };
  const handleSetUserPhoneNumber = (value) => {
    setPhoneNumberError(false);
    setPhoneNumber(value);
  };
  const handleSetUserName = (value) => {
    setNameError(false);
    setName(value);
  };

  useEffect(() => {
    if (userInfo?.name) {
      navigate("/");
      setLoader(false);
    }
    if (error) {
      toast.error("User already exists please log in!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPasswordError(false);
      setEmailError(false);
      setPasswordError(false);
      setNameError(false);
      setPhoneNumberError(false);
      setPhoneNumber("");
      setPassword("");
      setEmail("");
      setName("");
      setLoader(false);
    }
  }, [toggle]);
  return (
    <section className={style.signup_container}>
      <ToastContainer />
      <div className={style.signup_top}>
        <img src={logo} alt="MusiCart" />
        <span>MusiCart</span>
      </div>
      <div className={style.signup_buttom}>
        <div className={style.signup_buttom_container1}>
          <div className={style.input_container}>
            <span>Create Account</span>
            <div className={style.input_section}>
              <label>Name</label>
              <input
                onChange={(e) => handleSetUserName(e.target.value)}
                type="text"
                value={name}
              />
              {nameError && <span>Name is required!</span>}
            </div>
            <div className={style.input_section}>
              <label>Mobile number</label>
              <input
                onChange={(e) => handleSetUserPhoneNumber(e.target.value)}
                type="text"
                value={phoneNumber}
              />
              {phoneNumberError && <span>Mobile number is required!</span>}
            </div>
            <div className={style.input_section}>
              <label>Email id</label>
              <input
                onChange={(e) => handleSetUserEmail(e.target.value)}
                type="text"
                value={email}
              />
              {emailError && <span>Email is required!</span>}
            </div>

            <div className={style.input_section}>
              <label>Password</label>
              <input
                onChange={(e) => handleSetUserPasword(e.target.value)}
                type="password"
                value={password}
              />
              {passwordError && <span>Password is required!</span>}
            </div>
          </div>
          <div className={style.submit}>
            <span>
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </span>
            <button onClick={() => handleSubmit()}>
              {!loader ? "Continue" :   <img src="/loader.gif" alt="loader" style={{zIndex:"111px", maxHeight:"50vh", maxWidth:"20vw"}}/>}
            </button>
            <span>
              By continuing, you agree to Musicart privacy notice and conditions
              of use
            </span>
          </div>
        </div>
        <div className={style.signup_buttom_container2}>
          <span className={style.have_account}>Already have an account?</span>
          <span
            onClick={() => handleNavigateUserToSignInPage("/sign-in")}
            className={style.signin}
          >
            Signin
          </span>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
