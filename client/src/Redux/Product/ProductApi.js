import axios from "axios";
export const getProducts = () => {
  try {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/get`
    );
  } catch (error) {
    return Error(error.message);
  }
};
export const getSingleProduct = (id) => {
  try {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/get/single/product/${id}`
    );
  } catch (error) {
    return Error(error.message);
  }
};
export const getAllProductsByHeadTypeFilter = (data) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/filter/useType`,
      data
    );
  } catch (error) {
    return Error(error.message);
  }
};
export const getAllProductsByCompanyFilter = (data) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/filter/company`,
      data
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const getAllProductsByColourFilter = (data) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/filter/colour`,
      data
    );
  } catch (error) {
    return Error(error.message);
  }
};
export const getAllProductsByPriceFilter = (data) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/filter/price`,
      data
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const getAllProductsBySortComapnyFilter = (data) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/filter/sort/company`,
      data
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const getAllProductsBySortPriceFilter = (data) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/filter/sort/price`,
      data
    );
  } catch (error) {
    return Error(error.message);
  }
};

export const getAllProductsByKeywordFilter = (keyword) => {
  try {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_API}/api/v1/products/filter/keyword?keyword=${keyword}`
    );
  } catch (error) {
    return Error(error.message);
  }
};
