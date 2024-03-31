import React, { useEffect, useState } from "react";
import styles from "./CheckOut.module.css";
import logo from "../../images/image1.png";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleProductAsync,
  productToggle,
  singleProduct,
} from "../../Redux/Product/ProductSlice";
import {
  addOrderAsync,
  addToOrderSucc,
  clearAddToOrderSucc,
  removeAllFromCartAsync,
  user,
  userInfoToggle,
} from "../../Redux/User/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackArrow from "../BackArrow/BackArrow";

const CheckOut = () => {
  const { productId } = useParams();

  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productDetail, setProductDetail] = useState({});
  const [Loader1, setLoader1] = useState(false);
  const [Loader2, setLoader2] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const userInfo = useSelector(user);
  const navigate = useNavigate();

  const product = useSelector(singleProduct);
  const productAddToOrderSuccesfully = useSelector(addToOrderSucc);
  const toggle = useSelector(productToggle);
  const toggle1 = useSelector(userInfoToggle);
  const dispatch = useDispatch();

  const handleNavigateUser = (route) => {
    navigate(route);
  };

  const getChosenProduct = () => {
    dispatch(getSingleProductAsync(productId));
  };

  const handlePlaceOrder = (val) => {
    if (checkoutProducts[0]?.title) {
      if (!deliveryAddress) {
        toast.error("Delivery address is missing!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!paymentMethod) {
        toast.error("Payment Method is missing!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        if (val === "submit1") setLoader1(true);
        else setLoader2(true);

        if (checkoutProducts.length > 1 || checkoutProducts[0]?.id) {
          const productIds = checkoutProducts.map(({ id }) => String(id));

          dispatch(
            addOrderAsync({ productIds, deliveryAddress, paymentMethod })
          );
        } else {
          dispatch(
            addOrderAsync({
              productId: checkoutProducts[0]?.id || productId,
              paymentMethod,
              deliveryAddress,
            })
          );
        }
      }
    }
  };

  useEffect(() => {
    if (checkoutProducts.length === 0 && productId !== product?._id) {
      if (productId === String(0)) {
        setCheckoutProducts(userInfo?.cart);
        setProductDetail(userInfo?.cart[0]);
        setTotalAmount(
          userInfo?.cart?.reduce(
            (amount, item) => Math.round(item.price) * item.quantity + amount,
            0
          )
        );
      } else {
        getChosenProduct();
      }
    } else {
      setCheckoutProducts([Object(product)]);
      setProductDetail(product);
      setTotalAmount(product?.price);
    }
  }, [toggle]);

  const handleClearProductAddToOrder = (route) => {
    if (checkoutProducts[0]?.id) {
      dispatch(removeAllFromCartAsync());
    }
    setDeliveryAddress("");

    setPaymentMethod("");

    navigate(route);

    setTimeout(() => {
      dispatch(clearAddToOrderSucc());
    }, [5000]);
  };

  useEffect(() => {
    if (productAddToOrderSuccesfully) {
      setLoader2(false);
      setLoader1(false);

      handleClearProductAddToOrder("/order/success");
    }
  }, [toggle1]);

  return (
    <section className={styles.checkoutContainer}>
      <ToastContainer />
      <div className={styles.checkoutSection}>
        <BackArrow route="/cart" />
        <div className={styles.checkoutNavSection}>
          <div className={styles.checkoutNavUp}>
            <span onClick={() => handleNavigateUser("/")}>
              <img src={logo} alt="" />
            </span>
            <span className={styles.checkoutNavText}>Musicart</span>
            <span>Home/ Checkout</span>
          </div>
          <div className={styles.checkoutNavDown}>
            <button onClick={() => handleNavigateUser("/cart")}>
              Back to cart
            </button>
          </div>
        </div>
        <div className={styles.checkout}>
          <span>Checkout</span>
        </div>
        <div className={styles.checkoutDetailBox}>
          <div className={styles.checkoutDetailUp}>
            <div className={styles.deliveryInfoContainer}>
              <div className={styles.sec}>
                <span className={styles.redText}>1. Delivery address</span>
                <div className={styles.addressBox}>
                  <span className={styles.userName}>{userInfo?.name}</span>

                  <textarea
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    value={deliveryAddress}
                    type="text"
                  />
                </div>
              </div>
              <div className={styles.sec}>
                <span className={styles.redText}>2. Payment method</span>
                <select onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Online Pay">Online Pay</option>
                </select>
              </div>
              <div className={styles.sec}>
                <span className={styles.redText}>
                  3. Review items and delivery
                </span>
                <div className={styles.productListInfo}>
                  <div className={styles.productListImages}>
                    {checkoutProducts?.map((product) => (
                      <img
                        className={`${
                          checkoutProducts?.length > 1 &&
                          productDetail?.id === product?.id &&
                          styles.bigBorder
                        }`}
                        onClick={() => setProductDetail(product)}
                        src={product?.image}
                      />
                    ))}
                  </div>
                  <div className={styles.productListDescription}>
                    <span className={styles.productTitle}>
                      {productDetail?.title}
                    </span>
                    <span className={styles.productColour}>
                      Colour {productDetail?.colour}
                    </span>
                    <span>
                      Estimated delivery : Monday — FREE Standard Delivery
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.checkoutDetailDown}>
                <div>
                  <button onClick={() => handlePlaceOrder("submit1")}>
                    {!Loader1 ? (
                      "Place your order"
                    ) : (
                      <img src="/loader.gif" alt="loader" style={{zIndex:"111px", maxHeight:"50vh", maxWidth:"20vw"}}/>
                    )}
                  </button>
                  <div className={styles.productInfo}>
                    <span className={styles.price}>
                      Order Total : ₹{totalAmount + 45}
                    </span>{" "}
                    <span className={styles.info}>
                      Order Total : ₹{totalAmount} By placing your order, you
                      agree to Musicart privacy notice and conditions of use.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.orderSummaryContainer}>
              <div className={styles.orderSummarySection}>
                <div className={styles.placeOrder}>
                  <button onClick={() => handlePlaceOrder("submit2")}>
                    {!Loader2 ? (
                      "Place your order"
                    ) : (
                      <img src="/loader.gif" alt="loader" style={{zIndex:"111px", maxHeight:"50vh", maxWidth:"20vw"}}/>
                    )}
                  </button>
                  <span className={styles.info}>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </span>
                </div>
                <div className={styles.productSummary}>
                  <span>Order Summary</span>
                  <div className={styles.productPriceBox}>
                    <div className={styles.infoFlex}>
                      <span>Items : </span>
                      <span>₹3500.00 </span>
                    </div>
                    <div className={styles.infoFlex}>
                      <span>Delivery : </span>
                      <span>₹45.00 </span>
                    </div>
                  </div>
                </div>
                <div className={styles.total}>
                  <span>Order Total : </span>
                  <span>₹{totalAmount + 45}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
