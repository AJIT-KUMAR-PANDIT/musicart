import React from "react";
import HeaderPage from "../headerPage/headerPage";
import SearchHeader from "../../components/Serachheader/SearchHeader";
import Invoices from "../../components/Invoices/Invoices";
import FooterPage from "../FooterPage/FooterPage";
import Nav from "../../components/Nav/Nav";
import MobileHeader from "../../components/MobileHeader/MobileHeader";

const Invoicespage = () => {
  return (
    <>
      <HeaderPage />
      <MobileHeader />
      <Invoices />
      <FooterPage showFooterForMobile="no" />
      <Nav />
    </>
  );
};

export default Invoicespage;
