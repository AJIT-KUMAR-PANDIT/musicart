import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;

export const register = async (name, email, mobile, password) => {
  try {
    const requrl = `${backendURL}/register`;
    const payLoad = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
    };
    const response = await axios.post(requrl, payLoad);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const login = async (email, password) => {
  try {
    const requrl = `${backendURL}/login`;
    const payLoad = {
      email,
      password,
    };
    const response = await axios.post(requrl, payLoad);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};
