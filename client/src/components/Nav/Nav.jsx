import React, { useEffect } from "react";
import style from "./Nav.module.css";
import { FaFileInvoice, FaRegUser } from "react-icons/fa6";
import { TbShoppingCart } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  currentPage,
  logOutUser,
  setNewPage,
  user,
} from "../../Redux/User/UserSlice";

import homeIcon from "../../assets/home.svg";
import cartIcon from "../../assets/cart.svg";
import invoiceIcon from "../../assets/invoice.svg";
import loginIcon from "../../assets/login.svg";
import logoutIcon from "../../assets/logout.svg";

const Nav = () => {
  const { name, cart } = useSelector(user);
  const currPage = useSelector(currentPage);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleNavigateUser = (route) => {
    if (name) {
      navigate(route);
    } else {
      navigate("/sign-in");
    }
  };
  const handleLogoutOrLoginUser = (name) => {
    if (name === "Logout") {
      dispatch(logOutUser());
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <section className={style.nav_container}>
      <div className={style.nav_section}>
        <div onClick={() => handleNavigateUser("/")} className={style.nav_item}>
          <span
            className={`${
              currPage === "Home" ? style.line_on : style.line_off
            }`}
          ></span>
          <span className={style.nav_icon}>
            <img src={homeIcon} alt="homeIcon" />
          </span>
        </div>
        <div
          onClick={() => handleNavigateUser("/cart")}
          className={style.nav_item}
        >
          <span
            className={`${
              currPage === "Cart" ? style.line_on : style.line_off
            }`}
          ></span>
          <span className={style.nav_icon}>
            <img src={cartIcon} alt="cartIcon" />
          </span>
          {cart && <span className={style.cart}>{cart?.length}</span>}
          <span style={{fontSize:"11px"}}>Cart</span>
        </div>
        <div
          onClick={() => handleNavigateUser("/invoice")}
          className={style.nav_item}
        >
          <span
            className={`${
              currPage === "Invoice" ? style.line_on : style.line_off
            }`}
          ></span>
          <span className={style.nav_icon}>
            <img src={invoiceIcon} alt="invoiceIcon" />
          </span>
        </div>
        <div
          onClick={() => handleLogoutOrLoginUser(name ? "Logout" : "Login")}
          className={style.nav_item}
        >
          <span className={style.line}></span>
          <span className={style.nav_icon}>
            
            {name ? <img src={logoutIcon} alt="loginIcon" /> : <img src={loginIcon} alt="loginIcon" />}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Nav;
