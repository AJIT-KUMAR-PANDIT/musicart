import axios from "axios";
import { getToken } from "../../utils/getToken";

export const registerUser = (data) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/user/register`,
      data
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const logInUser = (data) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/user/login`,
      data
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const getUser = () => {
  try {
    const config = getToken();
    return axios.get(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/user/get`,
      config
    );
  } catch (error) {
    return Error(error.message);
  }
};
export const addToCart = (productId) => {
  try {
    const config = getToken();

    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/cart/add/product`,
      productId,
      config
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const removeFromCart = (productId) => {
  try {
    const config = getToken();
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/cart/remove/product`,
      productId,
      config
    );
  } catch (error) {
    return Error(error.message);
  }
};
export const increaseQty = (data) => {
  try {
    const config = getToken();
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/cart/increase/qty`,
      data,
      config
    );
  } catch (error) {
    return Error(error.message);
  }
};
export const addOrder = (data) => {
  try {
    const { productId } = data;

    const config = getToken();
    if (productId) {
      return axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/order/add/single/order`,
        data,
        config
      );
    } else {
      return axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/order/add/multiple/orders`,
        data,
        config
      );
    }
  } catch (error) {
    return Error(error.message);
  }
};

export const removeAllFromCart = () => {
  try {
    const config = getToken();
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/cart/delete/all`,
      config
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const addFeedback = (feedback) => {
  try {
    const config = getToken();
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/user/add/feedback`,

      feedback,
      config
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const deleteOrder = (data) => {
  try {
    const config = getToken();
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/order/delete/single/order`,

      data,
      config
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const deleteAllOrders = () => {
  try {
    const config = getToken();
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/order/delete/all/orders`,

      config
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const deleteAllCart = () => {
  try {
    const config = getToken();
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/cart/delete/all`,

      config
    );
  } catch (error) {
    return Error(error.message);
  }
};
export const deleteUserAccount = () => {
  try {
    const config = getToken();
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/user/delete/user`,

      config
    );
  } catch (error) {
    return Error(error.message);
  }
};
