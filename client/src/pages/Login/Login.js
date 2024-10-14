import React, { useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import image4 from '../../assets/images/image 4.png';
import { BACKEND_URL } from "../../constants/baseurl";

const Login = ({onLogin, setAuthToken }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userData.email.trim() || !userData.password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        userData
      );
      const { user,token } = response.data;
     
    // setAuthToken(token);
    
      console.log("userData", response.data);
      console.log("user:",user);

     onLogin(user,token);
     
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Invalid credentials. Please try again.");
    }
  };

  const navigate = useNavigate();
  const handelButton = () => {
    navigate("/signup");
  };
  return (
    <div className={style.loginContainer}>
      <div className={style.musiclogo}>
        <img src={image4} alt="logo"></img>
        <h3>Musicart</h3>
          </div>
      <div className={style.mainContainer}>
        <h2>Sign in</h2>
        <form onSubmit={handleLogin} className={style.formContainer}>
          <label htmlFor="Email or Mobile">
            Enter your email or mobile number
          </label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
          ></input>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          ></input>
           {error && <p className={style.errorMsg}>{error}</p>}
          <button type="submit">Continue</button>
          <p>
            By continuing ,you agree to Musicart privacy notice and conditions
            of use
          </p>
        </form>
      </div>
      <div className={style.lookDown}>
        <div className={style.text_Container}>
          <hr className={style.line}></hr>
          <div className={style.text}>New to Musicart?</div>
          <hr className={style.line}></hr>
        </div>
        <button onClick={handelButton}>Create your Musicart account</button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
