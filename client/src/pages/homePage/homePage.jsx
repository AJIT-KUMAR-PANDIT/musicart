import React from "react";
import Home from "../../components/home/Home";
import HeaderPage from "../headerPage/headerPage";
import FooterPage from "../FooterPage/FooterPage";
import SearchHeader from "../../components/Serachheader/SearchHeader";
import Nav from "../../components/Nav/Nav";

const HomePage = () => {
  return (
    <>
      <HeaderPage />
      <SearchHeader />
      <Home />
      <FooterPage />
      <Nav />
    </>
  );
};

export default HomePage;
