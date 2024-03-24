import style from "./CartMobile.module.css";
import Header from "../../../components/Header/Header";
import MobileNavFooter from "../../../components/MobileNavFooter/MobileNavFooter";
import backIcon from "../../../assets/backIcon.svg";
import headphone from "../../../assets/headphone.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartProduct } from "../../../apis/product";

const CartMobile = () => {
  const redirect = useNavigate();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getCartProduct().then((data) => {
      if (data.status === "SUCCESS") {
        setProducts(data.data);
      }
    });
  }, []);

  const handlePlaceOrder = async () => {
    redirect("/checkout/cart");
  };
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
        {products === null || products.length === 0 ? (
          <center
            style={{ marginTop: "30vh", fontWeight: "500", fontSize: "3vw" }}
          >
            <h1>Cart Empty</h1>
          </center>
        ) : (
          <>
            <div className={style.allCartProduct}>
              {products.map((item, index) => {
                return (
                  <div>
                    <img
                      src={item.productDetails.images[0]}
                      alt="headphoneimg"
                    />
                    <div className={style.productDetails}>
                      <span>
                        {item.productDetails.brand} {item.productDetails.model}
                      </span>
                      <span>₹{item.productDetails.price}</span>
                      <span>Clour : {item.productDetails.color}</span>
                      <span>{item.productDetails.available}</span>
                    </div>
                  </div>
                );
              })}
              <span className={style.conevienceFee}>
                Convenience Fee <span>₹45</span>
              </span>
              <summary>
                <span>Total:</span>
                <span>
                  ₹
                  {products.reduce((acc, item) => {
                    return (acc += item.quantity * item.productDetails.price);
                  }, 0) + 45}
                </span>
              </summary>
            </div>
            <div className={style.totalAmountAndOrderBtn}>
              <div>
                <span>Total Amount</span>
                <span>
                  ₹
                  {products.reduce((acc, item) => {
                    return (acc += item.quantity * item.productDetails.price);
                  }, 0) + 45}
                </span>
              </div>
              <button onClick={handlePlaceOrder}>PLACE ORDER</button>
            </div>
          </>
        )}
      </div>

      <MobileNavFooter component={"cart"} />
    </>
  );
};

export default CartMobile;
