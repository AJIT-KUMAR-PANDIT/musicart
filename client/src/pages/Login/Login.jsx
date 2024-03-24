import style from "./Login.module.css";
import musicIcon from "../../assets/musicIcon.svg";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth";
const Login = () => {
  const redirect = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const validateForm = (email, password) => {
    let error;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter valid email");
      error = true;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      toast.error(
        "Password should contain at least one uppercase, one lowercase, one number, and one special character"
      );
      error = true;
    }

    if (error) {
      return false;
    }
    return true;
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const validate = validateForm(user.email, user.password);
    if (validate) {
      const result = await login(user.email, user.password);
      if (result.status === "SUCCESS") {
        localStorage.setItem("musicArtToken", result.jwtToken);
        toast.success(result.message);
        setTimeout(() => {
          redirect("/");
        }, 2000);
      } else {
        toast.error(result.message);
      }
    }
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.titleDesktop}>
          <img src={musicIcon} alt="musicIcon" />
          <span>Musicart</span>
        </div>
        <div className={style.titleMobile}>
          <Header />
        </div>
        <span>Welcome</span>
        <div className={style.form}>
          <h1>Sign in</h1>
          <div>
            <span>Enter your email or mobile number</span>
            <input
              type="text"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <div>
            <span>Password</span>
            <input
              type="text"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          <button onClick={handleSumbit}>Continue</button>
          <span>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </span>
        </div>
        <div className={style.newToMusic}>
          <div></div>
          <span>New to Musicart?</span>
          <div></div>
        </div>
        <button
          className={style.button}
          onClick={() => {
            redirect("/signup");
          }}
        >
          Create your Musicart account
        </button>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Login;
