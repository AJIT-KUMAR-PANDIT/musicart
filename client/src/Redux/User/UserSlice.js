import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFeedback,
  addOrder,
  addToCart,
  deleteAllCart,
  deleteAllOrders,
  deleteOrder,
  deleteUserAccount,
  getUser,
  increaseQty,
  logInUser,
  registerUser,
  removeAllFromCart,
  removeFromCart,
} from "./UserApi";

const initialState = {
  user: {},
  fetching: false,
  userToggle: false,
  userInfoToggle: false,
  userCartToggle: false,
  signinError: false,
  signupError: false,
  error: false,
  addToCartSucc: false,
  addToOrderSucc: false,
  addToFeedbackSucc: false,
  currentPage: "Home",
  showDeleteModal: false,
};

export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (data) => {
    const response = await registerUser(data);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk("user/login", async (data) => {
  const response = await logInUser(data);
  return response.data;
});
export const getLoginUserAsync = createAsyncThunk("user/getuser", async () => {
  const response = await getUser();
  return response.data;
});

export const addToCartAsync = createAsyncThunk(
  "user/addtocart",
  async (productId) => {
    const response = await addToCart(productId);
    return response.data;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "user/removefromcart",
  async (productId) => {
    const response = await removeFromCart(productId);
    return response.data;
  }
);
export const increaseQtyAsync = createAsyncThunk(
  "user/increaseQty",
  async (data) => {
    const response = await increaseQty(data);
    return response.data;
  }
);
export const addOrderAsync = createAsyncThunk("user/addorder", async (data) => {
  const response = await addOrder(data);
  return response.data;
});

export const removeAllFromCartAsync = createAsyncThunk(
  "user/removeallfromcart",
  async () => {
    const response = await removeAllFromCart();
    return response.data;
  }
);

export const addFeedbackAsync = createAsyncThunk(
  "user/addfeedback",
  async (feedback) => {
    const response = await addFeedback(feedback);
    return response.data;
  }
);
export const deleteOrderAsync = createAsyncThunk(
  "user/deleteorder",
  async (data) => {
    const response = await deleteOrder(data);
    return response.data;
  }
);
export const deleteAllOrdersAysnc = createAsyncThunk(
  "user/deleteallorders",
  async () => {
    const response = await deleteAllOrders();
    return response.data;
  }
);

export const deleteAllCartAysnc = createAsyncThunk(
  "user/deleteallcart",
  async () => {
    const response = await deleteAllCart();
    return response.data;
  }
);

export const deleteUserAccountAysnc = createAsyncThunk(
  "user/deleteuseraccount",
  async () => {
    const response = await deleteUserAccount();
    return response.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = {};
      localStorage.removeItem("TOKEN");
      state.userInfoToggle = state.userInfoToggle ? false : true;
    },
    setNewPage: (state, action) => {
      const { page } = action.payload;
      state.currentPage = page;
    },
    setDeleteModal: (state, action) => {
      const { value } = action.payload;
      state.showDeleteModal = value;
      state.userInfoToggle = state.userInfoToggle ? false : true;
    },
    clearAddToCartSucc: (state) => {
      state.addToCartSucc = false;
    },
    clearAddToOrderSucc: (state) => {
      state.addToOrderSucc = false;
    },
    clearAddFeedbackSucc: (state) => {
      state.addToFeedbackSucc = false;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(registerUserAsync.pending, (state) => {
        state.signupError = false;
        state.fetching = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.signupError = false;
        const { token, user } = action.payload;

        state.fetching = false;
        state.user = user;
        localStorage.setItem("TOKEN", token);
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.fetching = false;
        state.signupError = true;
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.signinError = false;
        state.fetching = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.signinError = false;
        state.fetching = false;
        state.user = user;
        localStorage.setItem("TOKEN", token);
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.fetching = false;
        state.signinError = true;
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(getLoginUserAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getLoginUserAsync.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.fetching = false;
        state.user = user;
        state.userToggle = state.userToggle ? false : true;
      })
      .addCase(getLoginUserAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.userToggle = state.userToggle ? false : true;
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.addToCartSucc = true;
        state.userCartToggle = state.userCartToggle ? false : true;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.userCartToggle = state.userCartToggle ? false : true;
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.userCartToggle = state.userCartToggle ? false : true;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.userCartToggle = state.userCartToggle ? false : true;
      })
      .addCase(increaseQtyAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(increaseQtyAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.userCartToggle = state.userCartToggle ? false : true;
      })
      .addCase(increaseQtyAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.userCartToggle = state.userCartToggle ? false : true;
      })
      .addCase(addOrderAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.addToOrderSucc = true;
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(addOrderAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(removeAllFromCartAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(removeAllFromCartAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.addToOrderSucc = true;
        state.userCartToggle = state.userCartToggle ? false : true;
      })
      .addCase(removeAllFromCartAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })
      .addCase(addFeedbackAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(addFeedbackAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.addToFeedbackSucc = true;
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(addFeedbackAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.addToFeedbackSucc = true;
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })
      .addCase(deleteAllOrdersAysnc.pending, (state) => {
        state.fetching = true;
      })
      .addCase(deleteAllOrdersAysnc.fulfilled, (state, action) => {
        state.fetching = false;

        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(deleteAllOrdersAysnc.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })
      .addCase(deleteAllCartAysnc.pending, (state) => {
        state.fetching = true;
      })
      .addCase(deleteAllCartAysnc.fulfilled, (state, action) => {
        state.fetching = false;

        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(deleteAllCartAysnc.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })
      .addCase(deleteUserAccountAysnc.pending, (state) => {
        state.fetching = true;
      })
      .addCase(deleteUserAccountAysnc.fulfilled, (state, action) => {
        state.fetching = false;
        state.user = {};
        localStorage.removeItem("TOKEN");
        state.userInfoToggle = state.userInfoToggle ? false : true;
      })
      .addCase(deleteUserAccountAysnc.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      });
  },
});

export const {
  logOutUser,
  clearAddToCartSucc,
  clearAddToOrderSucc,
  clearAddFeedbackSucc,
  setNewPage,
  setDeleteModal,
} = userSlice.actions;
export const signupError = (state) => state.user.signupError;
export const signinError = (state) => state.user.signinError;
export const user = (state) => state.user.user;
export const currentPage = (state) => state.user.currentPage;
export const showDeleteModal = (state) => state.user.showDeleteModal;
export const fetching = (state) => state.user.fetching;
export const userToggle = (state) => state.user.userToggle;
export const addToCartSucc = (state) => state.user.addToCartSucc;
export const addToOrderSucc = (state) => state.user.addToOrderSucc;
export const addToFeedbackSucc = (state) => state.user.addToFeedbackSucc;
export const userInfoToggle = (state) => state.user.userInfoToggle;
export const userCartToggle = (state) => state.user.userCartToggle;

export default userSlice.reducer;
