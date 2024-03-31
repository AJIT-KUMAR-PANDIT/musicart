import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import { FiPhoneCall } from "react-icons/fi";
import { user, userInfoToggle, userToggle } from "../../Redux/User/UserSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const loginUser = useSelector(user);
  const toggle = useSelector(userInfoToggle);
  const toggle1 = useSelector(userToggle);

  const handleNavigateUserToNextPage = (route) => {
    navigate(route);
  };

  useEffect(() => {
    if (loginUser?.name) {
      setUserInfo(loginUser);
    } else {
      setUserInfo({});
    }
  }, [toggle, toggle1]);

  return (
    <section className={style.headerContainer}>
      <div className={style.headerSection}>
        <div className={style.header1}>
          <span>
            <FiPhoneCall size={23} />
          </span>
          <span>912121131313</span>
        </div>

        <div className={style.header2}>
          <span>Get 50% off on selected items</span>
          <span className={style.line}></span>
          <span>Shop Now</span>
        </div>
        <div className={style.header3}>
          {!userInfo?.name && (
            <>
              <span onClick={() => handleNavigateUserToNextPage("/sign-in")}>
                Login
              </span>
              <span className={style.line}></span>
              <span onClick={() => handleNavigateUserToNextPage("/sign-up")}>
                SignUp
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
