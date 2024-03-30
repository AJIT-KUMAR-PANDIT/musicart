import style from "./InvoiceDesktop.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import musicIcon from "../../../assets/musicIcon.svg";
import bag from "../../../assets/bag.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartProduct, addToCart } from "../../../apis/product";

const CartDesktop = () => {
  const redirect = useNavigate();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getCartProduct().then((data) => {
      if (data.status === "SUCCESS") {
        setProducts(data.data);
      }
    });
  }, []);

  const handleQuantityChange = async (id, quantity) => {
    const result = await addToCart(id, quantity, true);
    if (result.status === "SUCCESS") {
      getCartProduct().then((data) => {
        if (data.status === "SUCCESS") {
          setProducts(data.data);
        }
      });
    }
  };

  const handlePlaceOrder = async () => {
    redirect("/checkout/cart");
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
        <section className={style.CartProductsBox}>
          <title className={style.cartTitle}>
            <img src={bag} alt="cartbagicon" />
            <span>My Cart</span>
          </title>
          {products === null || products.length === 0 ? (
            <center
              style={{ marginTop: "10vh", fontWeight: "500", fontSize: "3vw" }}
            >
              <h1>Cart Empty</h1>
            </center>
          ) : (
            <div className={style.cartContainer}>
              <div className={style.allProducts}>
                {products.map((item, index) => {
                  return (
                    <div className={style.ProductDetails} key={index}>
                      <div>
                        <img
                          src={item.productDetails.images[0]}
                          alt="productImage"
                        />
                        <div>
                          <span>
                            {item.productDetails.brand}{" "}
                            {item.productDetails.model}
                          </span>
                          <span>Clour:{item.productDetails.color}</span>
                          <span>{item.productDetails.available}</span>
                        </div>
                        <div>
                          <span>Price</span>
                          <span>₹{item.productDetails.price}</span>
                        </div>
                        <div className={style.quantity}>
                          <span>Quantity</span>
                          <select
                            name="quantity"
                            onChange={(e) => {
                              handleQuantityChange(
                                item.productDetails._id,
                                e.target.value
                              );
                            }}
                          >
                            <option value={item.quantity} selected hidden>
                              {item.quantity}
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                        </div>
                        <div className={style.total}>
                          <span>Total</span>
                          <span>
                            ₹{item.productDetails.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={style.totalAmount}>
                <div>
                  <h5>PRICE DETAILS</h5>
                  <div className={style.totalMRP}>
                    <span>Total MRP</span>
                    <span>
                      ₹
                      {products.reduce((acc, item) => {
                        return (acc +=
                          item.productDetails.price * item.quantity);
                      }, 0)}
                    </span>
                  </div>
                  <div className={style.discounts}>
                    <span>Discounts on MRP</span>
                    <span>₹0</span>
                  </div>
                  <div className={style.conveinceFee}>
                    <span>Convenience Fee</span>
                    <span>₹45</span>
                  </div>
                </div>
                <div className={style.totalAmoutAndPlaceOrder}>
                  <div>
                    <span>Total Amount</span>
                    <span>
                      ₹
                      {products.reduce((acc, item) => {
                        return (acc +=
                          item.productDetails.price * item.quantity);
                      }, 0) + 45}
                    </span>
                  </div>
                  <button onClick={handlePlaceOrder}>PLACE ORDER</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <section className={style.footer}>
        <Footer />
      </section>
    </>
  );
};

export default CartDesktop;
