import style from "./Header.module.css";
import phoneIcon from "../../assets/phoneIcon.svg";
import musicIcon from "../../assets/musicIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const redirect = useNavigate();
  const [login, setLogin] = useState(
    localStorage.getItem("musicArtToken") ? true : false
  );
  return (
    <header className={style.desktopHeader}>
      <div className={style.leftBox}>
        <img src={phoneIcon} alt="phoneIcon" />
        <span>912121131313</span>
      </div>
      <div className={style.middleBox}>
        <span>Get 50% off on selected items | Shop Now</span>
      </div>
      <div className={style.rightBox}>
        {login ? (
          <button
            onClick={() => {
              setLogin(false);
              localStorage.removeItem("musicArtToken");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <a href="/signin">Login</a> | <a href="/signup">Signup</a>
          </>
        )}
      </div>
      <div
        className={style.mobileHeader}
        onClick={() => {
          redirect("/");
        }}
      >
        <img src={musicIcon} alt="musicIcon" />
        <span>Musicart</span>
      </div>
    </header>
  );
};

export default Header;
