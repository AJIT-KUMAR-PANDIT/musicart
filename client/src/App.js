import SignUp from "./components/SignUp/SignUp";
import SignInPage from "./pages/SignInPage/SignInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomePage from "./pages/homePage/homePage";

import CartPage from "./pages/CartPage/CartPage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CheckOut from "./components/CheckOut/CheckOut";
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import Invoices from "./components/Invoices/Invoices";
import Invoicespage from "./pages/InvoicesPage/Invoicespage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginUserAsync,
  user,
  userCartToggle,
  userInfoToggle,
  userToggle,
} from "./Redux/User/UserSlice";
import { getAllProductsAsync } from "./Redux/Product/ProductSlice";
import OrderSucces from "./components/OrderSuccess/OrderSucces";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import OrderDetailPage from "./pages/OrderDetailPage/OrderDetailpage";

const App = () => {
  const toggle = useSelector(userCartToggle);
  const toggle1 = useSelector(userInfoToggle);

  const dispatch = useDispatch();
  const handleGetLoginUser = () => {
    dispatch(getLoginUserAsync());
  };
  const handleGetAllProducts = () => {
    dispatch(getAllProductsAsync());
  };

  useEffect(() => {
    handleGetLoginUser();
    handleGetAllProducts();
  }, [toggle, toggle1]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/invoice" element={<Invoicespage />} />
        <Route path="/order/detail/:orderId" element={<OrderDetailPage />} />
        <Route
          path="product/detail/:productId"
          element={<ProductDetailPage />}
        />
        <Route path="/checkout/:productId" element={<CheckOutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
