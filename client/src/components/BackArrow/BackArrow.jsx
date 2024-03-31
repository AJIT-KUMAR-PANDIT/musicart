import React from "react";
import { GoArrowLeft } from "react-icons/go";
import style from "./BackArrow.module.css";
import { useNavigate } from "react-router-dom";
const BackArrow = ({ route }) => {
  const navigate = useNavigate();
  const handleNavigateUser = () => {
    navigate(route);
  };
  return (
    <section className={style.backArrowButton}>
      <span onClick={() => handleNavigateUser()}>
        <GoArrowLeft size={20} />
      </span>
    </section>
  );
};

export default BackArrow;
