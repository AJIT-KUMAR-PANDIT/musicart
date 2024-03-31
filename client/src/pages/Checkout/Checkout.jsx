import style from "./Checkout.module.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MobileNavFooter from "../../components/MobileNavFooter/MobileNavFooter";
import musicIcon from "../../assets/musicIcon.svg";
import backIcon from "../../assets/backIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import headphone from "../../assets/headphone.png";
import { useState, useEffect } from "react";
import {
  getCartProduct,
  getProductDetails,
  orderPlace,
} from "../../apis/product";

const Checkout = () => {
  const redirect = useNavigate();
  const { orderfrom } = useParams();
  const [products, setProducts] = useState(null);
  const [amount, setAmount] = useState(null);
  const [mBrand, setMbrand] = useState("");
  const [mModel, setMmodel] = useState("");
  const [mColor, setMcolor] = useState("");

  useEffect(() => {
    if (orderfrom === "cart") {
      getCartProduct().then((data) => {
        if ((data.status = "SUCCESS")) {
          setProducts(data.data);
          const totalAmount = data.data.reduce((acc, item) => {
            return (acc += item.productDetails.price * item.quantity);
          }, 0);
          setAmount(totalAmount);
        }
      });
    } else {
      getProductDetails(orderfrom).then((data) => {
        if ((data.status = "SUCCESS")) {
          setProducts(data.data);
          setAmount(data.data.price);
        }
      });
    }
  }, [orderfrom]);

  useEffect(() => {
    if (products !== null && products.length > 0) {
      const firstProduct = products[0];
      setMbrand(firstProduct.productDetails.brand);
      setMmodel(firstProduct.productDetails.model);
      setMcolor(firstProduct.productDetails.color);
    }
  }, [products]);

  const handleOrderPlace = async () => {
    if (orderfrom === "cart") {
      const result = await orderPlace(false, true);
      if (result.status === "SUCCESS") {
        toast.success(result.message);
        setTimeout(() => {
          redirect("/ordersuccess");
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } else {
      const productId = orderfrom;
      const result = await orderPlace(productId, false);
      if (result.status === "SUCCESS") {
        toast.success(result.message);
        setTimeout(() => {
          redirect("/ordersuccess");
        }, 2000);
      } else {
        console.log(result);
      }
    }
  };

  const handlePayment = (e) => {
    const selectedPaymentMode = e.target.value;

    switch (selectedPaymentMode) {
      case "Pay on Delivery":
        console.log("Selected payment mode: Pay on Delivery");
        break;
      case "UPI":
        console.log("Selected payment mode: UPI");
        break;
      case "Card":
        console.log("Selected payment mode: Card");
        break;
      default:
        console.log("Invalid payment mode selected");
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        <section className={style.desktoptitleNav}>
          <img src={musicIcon} alt="musicIcon" />
          <span>Musicart</span>
          <a href="/">Home/</a>
          <a href="/productid">checkout</a>
        </section>
        <button
          className={style.backToProductBtnDesktop}
          onClick={() => {
            redirect("/");
          }}
        >
          Back to products
        </button>
        <div className={style.backButtonMobile}>
          <img
            src={backIcon}
            alt="backArrow"
            onClick={() => {
              redirect("/");
            }}
          />
        </div>
        <h2 className={style.checkoutTitle}>Checkout</h2>
        <main className={style.checkoutContainer}>
          <div className={style.detailsContainer}>
            <div className={style.deliveryAddress}>
              <span>1. Delivery address</span>
              <span>
                <textarea
                  style={{
                    width: "235px",
                    height: "111px",
                    border: "1px solid black",
                  }}
                  className={style.addr}
                ></textarea>
              </span>
            </div>
            <div className={style.paymentMethod}>
              <span>2. Payment method</span>
              <select
                className={style.paySelect}
                name="Mode of payment"
                onChange={handlePayment}
              >
                <option value="Mode of payment">Mode of payment</option>
                <option value="Pay on Delivery">Pay on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <div className={style.reviewItems}>
              <span>3. Review items and delivery</span>
              <span style={{ display: "flex", flexWrap: "wrap", width: "420px", gap:"11px" }}>
                {products === null ? (
                  <h1>Loading...</h1>
                ) : orderfrom === "cart" ? (
                  products.map((item, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                      <span style={{ width: "111px", height: "111px" }}>
                        <img
                          src={item.productDetails.images[0]}
                          alt="headphoneIcon"
                          style={{
                            width: "111px",
                            height: "111px",
                            border: "1px solid black",
                          }}

                          onClick={() => {
                            setMbrand(item.productDetails.brand);
                            setMmodel(item.productDetails.model);
                            setMcolor(item.productDetails.color);
                          }}
                        />
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{ marginBottom: "20px" }}>
                    <span style={{ width: "111px", height: "111px" }}>
                      <img
                        src={products.images[0]}
                        alt="headphoneIcon"
                        style={{
                          width: "111px",
                          height: "111px",
                          border: "1px solid black",
                        }}
                      />
                    </span>
                    <button
                      onClick={() => {
                        setMbrand(products.brand);
                        setMmodel(products.model);
                        setMcolor(products.color);
                      }}
                    >
                      Set Details
                    </button>
                  </div>
                )}
           <div>
           <span className={style.mBrand} style={{color:"black"}}> 
              {mBrand} {mModel}
            </span>
            <br/>
            <span className={style.mColor}>Colour: {mColor}</span>
            <br/>
            <span className={style.mDelivery}  style={{color:"black"}}>Estimated delivery:</span>
            <br/>
            <span className={style.mDelivery}  style={{color:"black"}}>Monday-FREE Standard Delivery</span>
          
           </div>
              </span>
            </div>
           </div>
          <div className={style.orderPlaceSideSection}>
            <button onClick={handleOrderPlace}>Place your order</button>
            <span>
              By placing your order, you agree to Musicart privacy notice and conditions of use.
            </span>
            <div>
              <h5>Order Summary</h5>
              <div>
                <span>Item:</span>
                <span>₹{amount !== null ? amount.toFixed(2) : ""}</span>
              </div>
              <div>
                <span>Delivery:</span>
                <span>₹45.00</span>
              </div>
              <div>
                <span>Order Total:</span>
                <span>₹{amount !== null ? (amount + 45).toFixed(2) : ""}</span>
              </div>
            </div>
          </div>
        </main>
        <div className={style.orderSummaryBottomSide}>
          <button onClick={handleOrderPlace}>Place your order</button>
          <div>
            <span>Order Total : ₹{amount !== null ? (amount + 45).toFixed(2) : ""}</span>
            <span>
              By placing your order, you agree to Musicart privacy notice and conditions of use.
            </span>
          </div>
        </div>
      </div>
      <section className={style.desktopFooter}>
        <Footer />
      </section>
      <MobileNavFooter component={"cart"} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Checkout;
