import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;

export const getProduct = async (filterQuery) => {
  try {
    const requrl = `${backendURL}/product`;
    const queryParameters = {
      ...filterQuery,
    };
    const response = await axios.get(requrl, {
      params: queryParameters,
    });

    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const addToCart = async (id, quantity, replaceQuantity) => {
  try {
    const requrl = `${backendURL}/addToCart`;
    const storedToken = localStorage.getItem("musicArtToken");
    const config = {
      headers: {
        token: storedToken,
      },
    };
    let payLoad = { id, quantity, replaceQuantity: false };
    if (replaceQuantity) {
      payLoad = { id, quantity, replaceQuantity: true };
    }
    const response = await axios.put(requrl, payLoad, config);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const getProductDetails = async (id) => {
  try {
    const requrl = `${backendURL}/productDetails/${id}`;
    const response = await axios.get(requrl);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const getCartProduct = async () => {
  try {
    const requrl = `${backendURL}/cartproduct`;
    const storedToken = localStorage.getItem("musicArtToken");
    const config = {
      headers: {
        token: storedToken,
      },
    };
    const response = await axios.get(requrl, config);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const orderPlace = async (productId, orderFromCart) => {
  try {
    const requrl = `${backendURL}/orderPlace`;
    const storedToken = localStorage.getItem("musicArtToken");
    const config = {
      headers: {
        token: storedToken,
      },
    };
    const payLoad = {
      name: "Sanjeet Kumar",
      address: "2nd Floor A18 Ganesh Nagr,Delhi 110092",
      orderFromCart: false,
    };

    if (orderFromCart) {
      payLoad.orderFromCart = true;
    } else {
      payLoad.productId = productId;
    }
    const response = await axios.put(requrl, payLoad, config);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};
