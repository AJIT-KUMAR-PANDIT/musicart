import style from "./OrderSuccess.module.css";
import confetti from "../../assets/confetti.png";
import Footer from "../../components/Footer/Footer";
import MobileNavFooter from "../../components/MobileNavFooter/MobileNavFooter";
import Header from "../../components/Header/Header";
import musicIcon from "../../assets/musicIcon.svg";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const redirect = useNavigate();
  return (
    <>
      <div className={style.mobileHeader}>
        <Header />
      </div>
      <div className={style.desktopHeader}>
        <img src={musicIcon} alt="musicIcon" />
        <span>Musicart</span>
      </div>
      <main className={style.container}>
        <div className={style.confettiBox}>
          <img src={confetti} alt="confetti" />
          <span>Order is placed successfully!</span>
          <span>
            You will be receiving a confirmation email with order details
          </span>
          <button
            onClick={() => {
              redirect("/");
            }}
          >
            Go back to Home page
          </button>
        </div>
      </main>
      <div className={style.desktopFooter}>
        <Footer />
      </div>
      <MobileNavFooter />
    </>
  );
};

export default OrderSuccess;
