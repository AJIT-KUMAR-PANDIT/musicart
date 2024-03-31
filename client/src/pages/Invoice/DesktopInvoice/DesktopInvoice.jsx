import style from "./DesktopInvoice.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import musicIcon from "../../../assets/musicIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InvoiceCard from "../../../components/InvoiceCard/InvoiceCard";
import { getInvoices } from "../../../apis/invoice";

const DesktopInvoice = () => {
  const redirect = useNavigate();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await getInvoices();
      if (response.status === "SUCCESS") {
        setInvoices(response.data);
      } else {
        console.error("Failed to fetch invoices:", response.message);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

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
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice._id}
              name={invoice.name}
              address={invoice.address}
            />
          ))}
        </div>
      </main>
      <section className={style.footer}>
        <Footer />
      </section>
    </>
  );
};

export default DesktopInvoice;
