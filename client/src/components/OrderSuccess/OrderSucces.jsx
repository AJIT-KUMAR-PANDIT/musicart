import React from "react";
import style from "./OrderSuccess.module.css";
import succImg from "../../images/succorder.png";
import logo from "../../images/image1.png";
import { useNavigate } from "react-router-dom";
const OrderSucces = () => {
  const navigate = useNavigate();
  const handleNavigateUserToHomePage = (route) => {
    navigate(route);
  };
  return (
    <section className={style.orderplace_container}>
      <div className={style.orderplace_section}>
        <div className={style.orderplace_up}></div>
        <div className={style.orderplace_down}>
          <div className={style.orderplace_box1}>
            <span className={style.span1}>
              <img src={succImg} alt="img" />
            </span>
            <span className={style.span2}>Order is placed successfully!</span>
            <span className={style.span3}>
              You will be receiving a confirmation email with order details
            </span>
          </div>
          <div className={style.orderplace_box2}>
            <button onClick={() => handleNavigateUserToHomePage("/")}>
              Go back to Home page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSucces;
