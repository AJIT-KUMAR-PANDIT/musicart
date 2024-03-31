import React, { useEffect } from "react";
import style from "./Cart.module.css";
import logo from "../../images/image1.png";
import { IoBagOutline } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import BackArrow from "../BackArrow/BackArrow";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAllOrdersAysnc,
  increaseQtyAsync,
  removeFromCartAsync,
  setDeleteModal,
  setNewPage,
  showDeleteModal,
  user,
  userCartToggle,
  userToggle,
} from "../../Redux/User/UserSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productId, setProductId] = useState();
  const [productName, setProductName] = useState("");
  const [maxPriceProduct, setMaxPriceProduct] = useState({});
  const userInfo = useSelector(user);
  const deleteModalStatus = useSelector(showDeleteModal);
  const toggle = useSelector(userToggle);
  const handleNavigateUser = (route) => {
    navigate(route);
  };

  const handleRemoveFromCart = (productId, productName) => {
    setProductName(productName);
    setProductId(productId);
    dispatch(setDeleteModal({ value: true }));
  };
  const handleRemoveAllFromCart = () => {
    setProductName("all cart");
    setProductId("");
    dispatch(setDeleteModal({ value: true }));
  };
  const handleIncreaseQty = (productId, quantity) => {
    dispatch(increaseQtyAsync({ productId, quantity }));
  };
  const updateUserNewPage = (page) => {
    dispatch(setNewPage({ page }));
  };

  const totalAmount = userInfo?.cart?.reduce(
    (amount, item) => Math.round(item.price) * item.quantity + amount,
    0
  );

  const getMaxPriceProduct = (products) => {
    let maxPrice = 0;
    let productName = "";
    for (let i = 0; i < products?.length || 0; i++) {
      if (products[i]?.price * products[i]?.quantity > maxPrice) {
        productName = products[i].title;
      }
      maxPrice = Math.max(maxPrice, products[i]?.price * products[i]?.quantity);
    }
    setMaxPriceProduct({ maxPrice, productName });
  };

  useEffect(() => {
    updateUserNewPage("Cart");
  }, []);

  useEffect(() => {
    getMaxPriceProduct(userInfo?.cart);
  }, [toggle]);

  return (
    <>
      {userInfo?.cart?.length > 0 ? (
        <>
          <section className={style.cartContainer}>
            {deleteModalStatus && (
              <DeleteModal
                route="/cart"
                pageName="Cart"
                id={productId}
                productName={productName}
              />
            )}
            <div
              className={`${
                deleteModalStatus ? style.cartSectionBlur : style.cartSection
              }`}
            >
              <div className={style.cartUp}>
                <div className={style.cartNavDetails}>
                  <div className={style.cartNavFlex}>
                    <span>
                      <img src={logo} alt="" />
                    </span>
                    <span className={style.logoText}>Musicart</span>
                    <span>Home/ View Cart</span>
                  </div>
                  <div className={style.viewCartLogo}>
                    <MdShoppingCart size={23} /> View Cart{" "}
                    {userInfo?.cart?.length}
                  </div>
                </div>
                <div
                  onClick={() => handleNavigateUser("/")}
                  className={style.cartNav}
                >
                  <span>Back to products</span>
                </div>
              </div>
              <div className={style.cartDown}>
                <div className={style.cartLogo}>
                  <span>
                    <IoBagOutline size={35} />
                    My Cart
                  </span>
                </div>
                <div className={style.cartItemSection}>
                  <div className={style.cartItemUp}>
                    <div className={style.cartDetailBox}>
                      {userInfo?.cart?.map(
                        ({ title, image, colour, price, quantity, id }) => (
                          <div key={id} className={style.cartBox}>
                            <div className={style.cartBoxSec}>
                              <img src={image} alt={title} />
                              <button
                                onClick={() => handleRemoveFromCart(id, title)}
                                className={style.remove}
                              >
                                <span>
                                  <FaRegTrashAlt />
                                </span>
                              </button>
                            </div>
                            <div className={style.cartItemD}>
                              <span className={style.cartItemTitleText}>
                                {title}
                              </span>
                              <span className={style.cartItemColour}>
                                Colour : {colour}
                              </span>
                              <span className={style.cartItemStock}>
                                In Stock
                              </span>
                            </div>
                            <div className={style.cartItemD}>
                              <span>Price</span>
                              <span>₹{price}</span>
                            </div>
                            <div className={style.cartItemD}>
                              <span>Quantity</span>
                              <select
                                value={quantity}
                                onChange={(e) =>
                                  handleIncreaseQty(id, e.target.value)
                                }
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                              </select>
                            </div>
                            <div className={style.cartItemD}>
                              <span>Total</span>
                              <span>₹ {price * quantity}</span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className={style.priceDetailContainer}>
                      <div className={style.priceDetailSection}>
                        <div className={style.priceDetailBoxUp}>
                          <span>PRICE DETAILS</span>
                          <div className={style.priceDetailSec}>
                            <span>Total MRP</span>
                            <span>₹ {totalAmount}</span>
                          </div>

                          <div className={style.priceDetailSec}>
                            <span>Discount on MRP</span>
                            <span>₹0</span>
                          </div>
                          <div className={style.priceDetailSec}>
                            <span>Convenience Fee</span>
                            <span>₹45</span>
                          </div>
                        </div>
                        <div className={style.priceDetailBoxDown}>
                          <div className={style.priceDetailTotal}>
                            <span>Total Amount</span>
                            <span>₹{totalAmount + 45}</span>
                          </div>
                          <div className={style.orderBtn}>
                            <button
                              onClick={() => handleNavigateUser("/checkout/0")}
                            >
                              PLACE ORDER
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={style.cartItemDown}>
                    <div>
                      <span>Max price product : </span>
                      <span>{maxPriceProduct.productName}</span>
                      <span>₹{maxPriceProduct.maxPrice}</span>
                    </div>
                  </div>
                  <div className={style.deleteAllCartButtonsSection}>
                    <button onClick={() => handleRemoveAllFromCart()}>
                      Delete all cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={style.cartMobileContainer}>
            {deleteModalStatus && (
              <DeleteModal
                route="/cart"
                pageName="Cart"
                id={productId}
                productName={productName}
              />
            )}
            <span>
              <BackArrow route={"/"} />
            </span>

            <div
              className={`${
                deleteModalStatus
                  ? style.cartMobileSectionBlur
                  : style.cartMobileSection
              }`}
            >
              <div className={style.cartMobileMainBox}>
                {userInfo?.cart?.map(
                  ({ title, image, colour, price, quantity, id }) => {
                    return (
                      <>
                        <div key={id} className={style.cartMobileSectionUp}>
                          <div className={style.itemImg}>
                            <img src={image} alt={title} />
                            <button
                              onClick={() => handleRemoveFromCart(id, title)}
                              className={style.mobileRemove}
                            >
                              Remove
                            </button>
                          </div>
                          <div className={style.cartMobileDescription}>
                            <div className={style.details}>
                              <span className={style.cartItemTitle}>
                                {title}
                              </span>
                              <span className={style.cartItemPrice}>
                                ₹{price * quantity}
                              </span>

                              <select
                                value={quantity}
                                onChange={(e) =>
                                  handleIncreaseQty(id, e.target.value)
                                }
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                              </select>
                            </div>
                            <span>Clour : {colour}</span>
                            <span>In Stock</span>
                            <span>Convenience Fee ₹45</span>
                          </div>
                        </div>

                        <span className={style.cartItemLine}></span>
                      </>
                    );
                  }
                )}

                <div className={style.detailsTotal}>
                  <span>Max price : </span>
                  <span>{maxPriceProduct.productName}</span>
                  <span>₹{maxPriceProduct.maxPrice}</span>
                </div>
              </div>
              <div className={style.cartMobileSectionDown}>
                <span className={style.line}></span>
                <span className={style.totalAmount}>
                  <span>Total Amount </span>
                  <span className={style.totalPrice}>
                    ₹{totalAmount + 45}{" "}
                  </span>
                </span>
                <button onClick={() => handleNavigateUser(`/checkout/0`)}>
                  PLACE ORDER
                </button>
                <button
                  className={style.deleteCartMobileButtonSection}
                  onClick={() => handleRemoveAllFromCart()}
                >
                  DELETE ALL ORDER
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className={style.emptyCartContainer}>
          <div className={style.emptyCartBox}>
            <span>Cart is empty!</span>
            <button onClick={() => handleNavigateUser("/")}>
              Go back to Products
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
