import style from "./Checkout.module.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MobileNavFooter from "../../components/MobileNavFooter/MobileNavFooter";
import musicIcon from "../../assets/musicIcon.svg";
import backIcon from "../../assets/backIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
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
  const [selectedPayment, setSelectedPayment] = useState("Pay on Delivery");
  const [imgShowcase, setImgShowcase] = useState(0);

  useEffect(() => {
    if (orderfrom === "cart") {
      getCartProduct().then((data) => {
        if (data.status === "SUCCESS") {
          setProducts(data.data);
          const totalAmount = data.data.reduce((acc, item) => {
            return (acc += item.productDetails.price * item.quantity);
          }, 0);
          setAmount(totalAmount);
        }
      });
    } else {
      getProductDetails(orderfrom).then((data) => {
        if (data.status === "SUCCESS") {
          setProducts(data.data);
          setAmount(data.data.price);
        }
      });
    }
  }, [orderfrom]);

  const handleOrderPlace = async () => {
    if (orderfrom === "cart") {
      const result = await orderPlace(false, selectedPayment === "UPI");
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
      const result = await orderPlace(productId, selectedPayment === "UPI");
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
    setSelectedPayment(selectedPaymentMode);

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
                value={selectedPayment}
              >
                <option value="Pay on Delivery">Pay on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <div className={style.reviewItems}>
              <span>3. Review items and delivery</span>
              <span style={{ display: "flex" }}>
                {products === null ? (
                  <h1>Loading...</h1>
                ) : orderfrom === "cart" ? (
                  products.map((item, index) => {
                    return (
                      <div key={index}>
                        <span
                          style={{ width: "111px", height: "111px" }}
                        >
                          <img
                            src={item.productDetails.images[imgShowcase]}
                            alt="headphoneIcon"
                            style={{
                              width: "111px",
                              height: "111px",
                              border: "1px solid black",
                            }}
                          />
                          <span>
                            {item.productDetails.brand}{" "}
                            {item.productDetails.model}
                          </span>
                          <span>Colour: {item.productDetails.color}</span>
                          <span>{item.availale}</span>
                          <span>Estimated delivery:</span>
                          <span>Monday-FREE Standard Delivery</span>
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <span style={{ width: "111px", height: "111px" }}>
                      <img
                        src={products.images[imgShowcase]}
                        alt="headphoneIcon"
                        style={{
                          width: "111px",
                          height: "111px",
                          border: "1px solid black",
                        }}
                      />
                      <span>
                        {products.brand} {products.model}
                      </span>
                      <span>Colour: {products.color}</span>
                      <span>{products.availale}</span>
                      <span>Estimated delivery:</span>
                      <span>Monday-FREE Standard Delivery</span>
                    </span>
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className={style.orderPlaceSideSection}>
            <button onClick={handleOrderPlace}>Place your order</button>
            <span>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
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
                <span>
                  ₹{amount !== null ? (amount + 45).toFixed(2) : ""}
                </span>
              </div>
            </div>
          </div>
        </main>
        <div className={style.orderSummaryBottomSide}>
          <button onClick={handleOrderPlace}>Place your order</button>
          <div>
            <span>
              Order Total : ₹{amount !== null ? (amount + 45).toFixed(2) : ""}
            </span>
            <span>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
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
