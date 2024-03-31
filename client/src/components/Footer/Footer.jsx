import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";

const Footer = ({ showFooterForMobile }) => {
  return (
    <section
      className={`${
        showFooterForMobile === "no"
          ? style.footerContainerOff
          : style.footerContainerOn
      }`}
    >
      <span>Musicart | All rights reserved</span>
    </section>
  );
};

export default Footer;
