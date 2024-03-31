import React from "react";
import HeaderPage from "../headerPage/headerPage";
import SearchHeader from "../../components/Serachheader/SearchHeader";
import CheckOut from "../../components/CheckOut/CheckOut";
import Nav from "../../components/Nav/Nav";
import FooterPage from "../FooterPage/FooterPage";

const CheckOutPage = () => {
  return (
    <>
      <HeaderPage />
      <SearchHeader />
      <CheckOut />
      <FooterPage />
      <Nav />
    </>
  );
};

export default CheckOutPage;
