import React from "react";
import Footer from "../../components/Footer/Footer";
import OrderSucces from "../../components/OrderSuccess/OrderSucces";
import HeaderPage from "../headerPage/headerPage";
import MobileHeader from "../../components/MobileHeader/MobileHeader";

const OrderSuccessPage = () => {
  return (
    <>
      <HeaderPage />
      <MobileHeader />
      <OrderSucces />
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
