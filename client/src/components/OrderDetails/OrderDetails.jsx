import React, { useEffect, useState } from "react";
import style from "./OrderDetails.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../images/image1.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteModal,
  showDeleteModal,
  user,
} from "../../Redux/User/UserSlice";
import { useParams } from "react-router-dom";
import BackArrow from "../BackArrow/BackArrow";
import DeleteModal from "../DeleteModal/DeleteModal";
const OrderDetails = () => {
  const { orderId } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const { orders, name } = useSelector(user);
  const deleteModalStatus = useSelector(showDeleteModal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigateUser = (route) => {
    navigate(route);
  };
  const handleShowDeleteModal = () => {
    dispatch(setDeleteModal({ value: true }));
  };

  useEffect(() => {
    let product = orders?.find(({ id }) => id === orderId);
    setProductDetail(product);
  }, []);

  return (
    <section className={style.orderdetails_container}>
      {deleteModalStatus && (
        <DeleteModal
          route="/invoice"
          pageName="Invoice"
          id={productDetail?.id}
          productName={productDetail?.title}
        />
      )}
      <div
        className={`${
          deleteModalStatus
            ? style.orderdetails_section_blur
            : style.orderdetails_section
        }`}
      >
        <BackArrow route="/invoice" />
        <div className={style.orderdetails_nav_section}>
          <div className={style.orderdetails_nav_up}>
            <span onClick={() => handleNavigateUser("/")}>
              <img src={logo} alt="" />
            </span>
            <span className={style.orderdetails_nav_text}>Musicart</span>
            <span>Home/ invoices</span>
          </div>
          <div className={style.orderdetails_nav_down}>
            <button onClick={() => handleNavigateUser("/cart")}>
              Back to cart
            </button>
          </div>
        </div>
        <div className={style.orderdetails}>
          <span>Invoice</span>
        </div>
        <div className={style.orderdetails_detail_box}>
          <div className={style.orderdetails_detail_up}>
            <div className={style.delivery_info_container}>
              <div className={style.sec}>
                <span className={style.red_text}>1. Delivery address</span>
                <div className={style.address_box}>
                  <span className={style.user_name}>{name}</span>

                  <textarea
                    value={productDetail?.deliveryAddress}
                    type="text"
                  />
                </div>
              </div>
              <div className={style.sec}>
                <span className={style.red_text}>2.Payment method</span>
                <select>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                </select>
              </div>
              <div className={style.sec}>
                <span className={style.red_text}>
                  3.Review items and delivery
                </span>
                <div className={style.product_list_info}>
                  <div className={style.product_list_images}>
                    <img
                      //onClick={() => setProductDetail(product)}
                      src={productDetail?.image}
                    />
                  </div>
                  <div className={style.product_list_description}>
                    <span className={style.product_title}>
                      {productDetail?.title}
                    </span>
                    <span className={style.product_colour}>
                      Colour {productDetail?.colour}
                    </span>
                    <span>
                      Estimated delivery : Monday — FREE Standard Delivery
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.orderdetails_detail_down}>
                <div>
                  <div className={style.product_info}>
                    <span className={style.price}>
                      Order Total : ₹
                      {productDetail?.price * productDetail?.quantity + 45}
                    </span>{" "}
                    <span className={style.info}>
                      Order Total : ₹ {orders?.price * orders?.quantity + 45} By
                      placing your order, you agree to Musicart privacy notice
                      and conditions of use.
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.delete_invoice_button_section}>
                <button onClick={() => handleShowDeleteModal()}>
                  Delete invoice
                </button>
              </div>
            </div>
            <div className={style.order_summary_container}>
              <div className={style.order_summary_section}>
                <div className={style.place_order}>
                  <span className={style.info}>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </span>
                </div>
                <div className={style.product_summary}>
                  <span>Order Summary</span>
                  <div className={style.product_price_box}>
                    <div className={style.info_flex}>
                      <span>Items : </span>
                      <span>
                        ₹ {productDetail?.price * productDetail?.quantity + 45}{" "}
                      </span>
                    </div>
                    <div className={style.info_flex}>
                      <span>Delivery : </span>
                      <span>₹45.00 </span>
                    </div>
                  </div>
                </div>
                <div className={style.total}>
                  <span>Order Total : </span>
                  <span>
                    ₹ {productDetail?.price * productDetail?.quantity + 45}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
