import React from "react";
import style from "./MobileHeader.module.css";
import logo from "../../images/image1.png";
const MobileHeader = () => {
  return (
    <section className={style.mobile_container}>
      <div className={style.mobile_section}>
        <span>
          <img src={logo} alt="Musicart" />
        </span>
        <span className={style.text}>Musicart</span>
      </div>
    </section>
  );
};

export default MobileHeader;
