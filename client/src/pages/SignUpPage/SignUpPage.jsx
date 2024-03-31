import React from "react";
import SignUp from "../../components/SignUp/SignUp";

import MobileHeader from "../../components/MobileHeader/MobileHeader";
import Footer from "../../components/Footer/Footer";

const SignUpPage = () => {
  return (
    <>
      <MobileHeader />
      <SignUp />;
      <Footer />
    </>
  );
};

export default SignUpPage;
