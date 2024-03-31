import React from "react";
import HeaderPage from "../headerPage/headerPage";
import SearchHeader from "../../components/Serachheader/SearchHeader";
import Cart from "../../components/Cart/Cart";
import FooterPage from "../FooterPage/FooterPage";
import Nav from "../../components/Nav/Nav";

const CartPage = () => {
  return (
    <>
      <HeaderPage />
      <SearchHeader />
      <Cart />
      <FooterPage />
      <Nav />
    </>
  );
};

export default CartPage;
