import React from "react";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import Nav from "../../components/Nav/Nav";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import HeaderPage from "../headerPage/headerPage";

const OrderDetailPage = () => {
  return (
    <>
      <HeaderPage />
      <MobileHeader />
      <OrderDetails />;
      <Nav />
    </>
  );
};

export default OrderDetailPage;
