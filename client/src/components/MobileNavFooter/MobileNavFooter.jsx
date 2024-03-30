import HomeIcon from "../../assets/homeIcon.svg";
import LogoutIcon from "../../assets/logout.svg";
import LoginIcon from "../../assets/loginIcon.svg";
import CartIcon from "../../assets/cartIcon.svg";
import invoiceIcon from "../../assets/invoiceIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./MobileNavFooter.module.css";

const MobileNavFooter = (prop) => {
  const redirect = useNavigate();
  const [login, setLogin] = useState(
    localStorage.getItem("musicArtToken") ? true : false
  );
  const [selected, setSelected] = useState(prop.component);
  return (
    <div className={style.footerNav}>
      <div onClick={() => setSelected("home")}>
        {selected === "home" ? <div></div> : ""}
        <img
          src={HomeIcon}
          alt="homeicon"
          onClick={() => {
            redirect("/");
          }}
        />
        <span>Home</span>
      </div>
      <div onClick={() => setSelected("cart")}>
        {selected === "cart" ? <div></div> : ""}
        <img
          src={CartIcon}
          alt="carticon"
          onClick={() => {
            redirect("/cart");
          }}
        />
        <span>Cart</span>
      </div>
     {
      (login)?(
        <>
         <div onClick={() => setSelected("invoice")}>
        {selected === "invoice" ? <div></div> : ""}
        <img
          src={invoiceIcon}
          alt="invoiceicon"
          onClick={() => {
            redirect("/invoice");
          }}
        />
        <span>invoice</span>
      </div>
        </>
      ):(
        <></>
      )
     }
      <div
        onClick={() => {
          if (!login) {
            redirect("/signin");
          }
          if (login) {
            localStorage.removeItem("musicArtToken");
          }
        }}
      >
        <img
          src={login ? LogoutIcon : LoginIcon}
          alt="homeicon"
          onClick={(prev) => {
            setLogin(!prev);
          }}
        />
        <span>{login ? "Logout" : "Login"}</span>
      </div>
    </div>
  );
};

export default MobileNavFooter;
