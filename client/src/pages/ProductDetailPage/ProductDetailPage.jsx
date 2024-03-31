import React from "react";
import HeaderPage from "../headerPage/headerPage";
import SearchHeader from "../../components/Serachheader/SearchHeader";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import FooterPage from "../FooterPage/FooterPage";
import Nav from "../../components/Nav/Nav";

const ProductDetailPage = () => {
  return (
    <>
      <HeaderPage />
      <SearchHeader />
      <ProductDetail />
      <FooterPage />
      <Nav />
    </>
  );
};

export default ProductDetailPage;
