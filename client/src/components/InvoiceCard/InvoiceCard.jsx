import React from "react";
import styleInvoiceCard from "./InvoiceCard.module.css";
import invoice from "../../assets/invoiceLight.svg";
import lineInvoice from "../../assets/lineInvoice.svg";

const InvoiceCard = () => {
  return (
    <>
      <div className={styleInvoiceCard.container}>
        <div style={{ display: "flex" }}>
          <div>
            <img src={invoice} alt="invoiceLight" />
          </div>
          <div>
            <div className={styleInvoiceCard.name}>Akash Patel</div>
            <div
              className={styleInvoiceCard.address}
              
            >
              104 kk hh nagar, Lucknow Uttar Pradesh 226025
            </div>
          </div>
        </div>
        <div>
          <button className={styleInvoiceCard.viewInvoice}>
            View Invoice{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default InvoiceCard;
