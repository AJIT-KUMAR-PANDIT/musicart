import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../../pages/Home/Home.module.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios";
import { BACKEND_URL } from "../../constants/baseurl";


const ListItem = ({ item ,addtoCart,userId}) => {
  const navigate = useNavigate();
  const handleItem = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  const handleCart = async () => {

    try {
  
      if (!userId || !item._id) {
        console.error("User ID or product data missing");
        return;
      }

      console.log(userId,item._id)

      
      await axios.post(`${BACKEND_URL}/api/cart/addtoCart/${userId}`, {
        productId: item._id,
        quantity: 1, 
      });

      addtoCart(item._id);

      
    } catch (error) {
      console.error("Error adding to Cart:", error);
    }
  };
  return (
    <div>
      <div key={item._id} className={style.ListitemContainer}>
        <img src={item.images[0]} alt={item.model} />
        <MdOutlineAddShoppingCart className={style.carticon} onClick={handleCart}/>
        <div className={style.itemDetails}>
          <h3>{item.name}</h3>
          <h4>Price - ₹{item.price}</h4>
          <h4>
            {item.color} | {item.type}
          </h4>
          <h4>{item.title}</h4>
          <button onClick={() => handleItem(item._id)}>Details</button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
