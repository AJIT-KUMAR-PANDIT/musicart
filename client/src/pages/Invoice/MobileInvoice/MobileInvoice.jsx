import style from "./MobileInvoice.module.css";
import Header from "../../../components/Header/Header";
import MobileNavFooter from "../../../components/MobileNavFooter/MobileNavFooter";
import backIcon from "../../../assets/backIcon.svg";
import { useNavigate } from "react-router-dom";
import InvoiceCard from "../../../components/InvoiceCard/InvoiceCard";

const MobileInvoice = () => {
  const redirect = useNavigate();

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.backButton}>
          <img
            src={backIcon}
            alt="backArrow"
            onClick={() => {
              redirect("/");
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <InvoiceCard />
        </div>
      </div>

      <MobileNavFooter component={"invoice"} />
    </>
  );
};

export default MobileInvoice;
