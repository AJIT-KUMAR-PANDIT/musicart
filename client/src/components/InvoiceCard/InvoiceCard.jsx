import React from "react";
import styleInvoiceCard from "./InvoiceCard.module.css";
import invoice from "../../assets/invoiceLight.svg";
import lineInvoice from "../../assets/lineInvoice.svg";

const InvoiceCard = ({ name, address }) => {
  return (
    <>
      <div className={styleInvoiceCard.container}>
        <div style={{ display: "flex" }}>
          <div>
            <img src={invoice} alt="invoiceLight" />
          </div>
          <div>
            <div className={styleInvoiceCard.name}>{name}</div>
            <div
              className={styleInvoiceCard.address}
            >
              {address}
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
