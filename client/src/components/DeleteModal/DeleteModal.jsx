import React, { useEffect, useState } from "react";
import style from "./DeleteModal.module.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteAllCartAysnc,
  deleteAllOrdersAysnc,
  deleteOrderAsync,
  deleteUserAccountAysnc,
  removeFromCartAsync,
  setDeleteModal,
  showDeleteModal,
  userCartToggle,
  userInfoToggle,
} from "../../Redux/User/UserSlice";
import { BeatLoader } from "react-spinners";

const DeleteModal = ({ id, productName, pageName, route }) => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = useSelector(userInfoToggle);
  const toggle1 = useSelector(userCartToggle);

  const handleDeleteItem = () => {
    console.log(id, productName, pageName, route);
    if (pageName === "Invoice" && id && route && productName) {
      setLoader(true);
      dispatch(deleteOrderAsync({ orderId: id }));
    } else if (pageName === "Cart" && id && route && productName) {
      setLoader(true);
      dispatch(removeFromCartAsync({ productId: id }));
    } else if (pageName === "Invoice" && !id) {
      setLoader(true);
      dispatch(deleteAllOrdersAysnc());
    } else if (pageName === "Cart" && !id) {
      setLoader(true);
      dispatch(deleteAllCartAysnc());
    } else if (pageName === "Home" && !id) {
      setLoader(true);
      dispatch(deleteUserAccountAysnc());
    }
  };

  const handleCloseDeleteModal = () => {
    dispatch(setDeleteModal({ value: false }));
  };

  useEffect(() => {
    if (loader) {
      setLoader(false);
      handleCloseDeleteModal();

      navigate(route);
    }
  }, [toggle, toggle1]);

  return (
    <section className={style.deleteModalContainer}>
      <div className={style.deleteModalSection}>
        <span
          onClick={() => handleCloseDeleteModal()}
          className={style.closeIcon}
        >
          <IoMdClose size={20} />
        </span>
        <span className={style.deleteModalText1}>Delete {pageName}</span>
        <span className={style.deleteModalText2}>
          Are you sure you want to delete
          <br />
          <span className={style.deleteProductName}>{productName}</span>?
        </span>

        <div className={style.deleteModalButtonsSection}>
          <button
            onClick={() => handleCloseDeleteModal()}
            className={style.btnCancel}
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteItem()}
            className={style.btnDelete}
          >
            {!loader ? "Delete" : <BeatLoader size={13} color="white" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
