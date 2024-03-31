import React, { useEffect } from "react";
import style from "./Invoices.module.css";
import logo from "../../images/image1.png";
import { MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteModal,
  setNewPage,
  showDeleteModal,
  user,
} from "../../Redux/User/UserSlice";
import BackArrow from "../BackArrow/BackArrow";
import DeleteModal from "../DeleteModal/DeleteModal";
import invoiceLightIcon from "../../assets/invoiceLight.svg";
const Invoices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders = [], name, cart = [] } = useSelector(user);
  const deleteModalStatus = useSelector(showDeleteModal);
  const handleNavigateUser = (route) => {
    navigate(route);
  };
  let allProducts = [...orders].reverse();

  const updateUserNewPage = (page) => {
    dispatch(setNewPage({ page }));
  };
  const handleShowDeleteModal = () => {
    dispatch(setDeleteModal({ value: true }));
  };

  useEffect(() => {
    updateUserNewPage("Invoice");
  }, []);

  return (
    <section className={style.invoices_container}>
      {deleteModalStatus && (
        <DeleteModal
          route="/invoice"
          pageName="Invoice"
          productName="all invoices"
        />
      )}
      <div
        className={`${
          deleteModalStatus
            ? style.invoices_section_blur
            : style.invoices_section
        }`}
      >
        <BackArrow route="/" />
        <div className={style.invoices_up}>
          <div className={style.invoices_nav_details}>
            <div className={style.invoices_nav_flex}>
              <span>
                <img src={logo} alt="" />
              </span>
              <span className={style.logo_text}>Musicart</span>
              <span>Home/ Invoices</span>
            </div>
            <div className={style.view_invoices_logo}>
              <MdShoppingCart size={23} /> View Cart {cart.length}
            </div>
          </div>
          <div
            onClick={() => handleNavigateUser("/")}
            className={style.invoices_nav}
          >
            <span>Back to home</span>
          </div>
        </div>
        <div className={style.invoices}>
          <span>My Invoices</span>
        </div>

        {allProducts?.length > 0 ? (
          <div className={style.invoices_box}>
            {allProducts?.map(
              ({ paymentMethod, title, deliveryAddress, id }) => (
                <div className={style.invoices_sec_info}>
                  <div className={style.flex_box}>
                    <span>
                    <img src={invoiceLightIcon} alt="invoiceLightIcon" />
                    </span>
                    <div>
                      <span className={style.user_name}>{title}</span>
                      <span className={style.delivery_info}>
                        {deliveryAddress.slice(1, 15)}
                      </span>
                    </div>
                  </div>

                  <div className={style.view}>
                    <button
                      onClick={() => handleNavigateUser(`/order/detail/${id}`)}
                    >
                      View Invoice
                    </button>
                  </div>
                </div>
              )
            )}
            <div className={style.delete_all_invoice_container}>
              <button onClick={() => handleShowDeleteModal()}>
                Delete all invoices
              </button>
            </div>
          </div>
        ) : (
          <div className={style.empty}>
            <span>Your Invoice is empty!</span>
            <button onClick={() => handleNavigateUser("/")}>
              Go back to home
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Invoices;
