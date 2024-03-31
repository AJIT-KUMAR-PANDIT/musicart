import React from "react";
import SignIn from "../../components/SignIn/SignIn";
import Footer from "../../components/Footer/Footer";
import MobileHeader from "../../components/MobileHeader/MobileHeader";

const SignInPage = () => {
  return (
    <>
      <MobileHeader />
      <SignIn />;
      <Footer />
    </>
  );
};

export default SignInPage;
