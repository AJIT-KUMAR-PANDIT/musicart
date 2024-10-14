import React, { useState } from "react";
import style from "./Signup.module.css";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import image4 from '../../assets/images/image 4.png';
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants/baseurl";

const SignUp = () => {
 

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    mobile:false,
    email: false,
    password: false,
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;


    let error = false;
    if (name === "email") {
      error = !isValidEmail(value);
    } else if (name === "mobile") {
      error = !isValidMobile(value);
    } else if (name === "password") {
      error = !isValidPassword(value);
    } else if (name === "name") {
      error = !isValidName(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {


    e.preventDefault();

    const hasErrors = Object.values(formErrors).some((error) => error);
    if (hasErrors) {
      console.log("Form has errors. Please correct them.");
      return;
    }
    
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/signup`,
        formData
      );
      navigate('/login');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    console.log(formData);
    
    }
  
      
    
     
    
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };


  return (
    <div className={style.signupContainer}>
      <div className={style.musiclogo}>
        <img src={image4} alt="logo"/>
        <h3>Musicart</h3>
      </div>
      
      <div className={style.mainContainer}>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className={style.formContainer}>
          <div>
            <label htmlFor="Name">Your name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={formErrors.name ? style.error : ""}
            ></input>
             {formErrors.name && (
              <span className={style.errorMsg}>Invalid name format</span>
            )}
          </div>
          <div>
            <label htmlFor="mobileNumber">Mobile number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={formErrors.mobile ? style.error : ""}
            ></input>
            {formErrors.mobile && (
              <span className={style.errorMsg}>Invalid mobile number</span>
            )}
          </div>
          <div>
            <label htmlFor="EmailID">Email Id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? style.error : ""}
            ></input>
            {formErrors.email && (
              <span className={style.errorMsg}>Invalid email format</span>
            )}
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? style.error : ""}
            ></input>
          {formErrors.password && (
              <span className={style.errorMsg}>
                Password must be at least 6 characters long
              </span>
            )}
          </div>
          <div className={style.termsArea}>
            <p>
              By enrolling your mobile phone number ,you consent to receive
              automated security notifications via text message form
              musicart,Message and data rates may apply
            </p>
            <button type="submit">Continue</button>
            <p className={style.para}>
              By continuing ,you agree to Musicart privacy notice and conditions
              of use
            </p>
          </div>
        </form>
      </div>
      <h3>
        Already have an account? <Link to="/login">Sign in</Link>
      </h3>
      <Footer />
    </div>
  );
};

export default SignUp;
