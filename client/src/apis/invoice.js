import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;

export const createInvoice = async (invoiceData) => {
  try {
    const requrl = `${backendURL}/invoices`;
    const response = await axios.post(requrl, invoiceData);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const getInvoices = async () => {
  try {
    const requrl = `${backendURL}/invoices`;
    const response = await axios.get(requrl);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const getInvoiceDetails = async (id) => {
  try {
    const requrl = `${backendURL}/invoices/${id}`;
    const response = await axios.get(requrl);
    return response.data;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};
