import style from "./DesktopInvoice.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import musicIcon from "../../../assets/musicIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InvoiceCard from "../../../components/InvoiceCard/InvoiceCard";

const DesktopInvoice = () => {
  const redirect = useNavigate();
  const [products, setProducts] = useState(null);


  return (
    <>
      <section className={style.header}>
        <Header />
      </section>
      <main className={style.container}>
        <section className={style.firstBox}>
          <div className={style.titleNav}>
            <img src={musicIcon} alt="musicIcon" />
            <span>Musicart</span>
            <a href="/">Home/</a>
            <a href="/invoice">Invoice</a>
          </div>
        </section>
        <button
          className={style.backToProductBtn}
          onClick={() => {
            redirect("/");
          }}
        >
          Back to Home
        </button>
        <div>
          <div className={style.myInvoice}>My Invoices</div>
        </div>
        <br/><br/>
        <div style={{display:"flex",justifyContent:"center"}}>
        <InvoiceCard/>
        </div>
              </main>
      <section className={style.footer}>
        <Footer />
      </section>
    </>
  );
};

export default DesktopInvoice;
