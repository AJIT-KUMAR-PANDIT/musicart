import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllProductsByColourFilter,
  getAllProductsByCompanyFilter,
  getAllProductsByDescFilter,
  getAllProductsByHeadTypeFilter,
  getAllProductsByKeywordFilter,
  getAllProductsByPriceFilter,
  getAllProductsBySortComapnyFilter,
  getAllProductsBySortPriceFilter,
  getProducts,
  getSingleProduct,
} from "./ProductApi";

const initialState = {
  products: [],
  fetching: false,
  productToggle: false,
  error: "",
  singleProduct: {},
};

export const getAllProductsAsync = createAsyncThunk("product/get", async () => {
  const response = await getProducts();

  return response.data;
});

export const getSingleProductAsync = createAsyncThunk(
  "product/single",
  async (id) => {
    const response = await getSingleProduct(id);

    return response.data;
  }
);

export const getAllProductByHeadTypeFilterAsync = createAsyncThunk(
  "product/filter/headtype",
  async (data) => {
    const response = await getAllProductsByHeadTypeFilter(data);

    return response.data;
  }
);

export const getAllProductsByCompanyFilterAsync = createAsyncThunk(
  "product/filter/company",
  async (data) => {
    const response = await getAllProductsByCompanyFilter(data);

    return response.data;
  }
);

export const getAllProductsByColourFilterAsync = createAsyncThunk(
  "product/filter/colour",
  async (data) => {
    const response = await getAllProductsByColourFilter(data);
    return response.data;
  }
);

export const getAllProductsByPriceFilterAsync = createAsyncThunk(
  "product/filter/price",
  async (data) => {
    const response = await getAllProductsByPriceFilter(data);
    return response.data;
  }
);

export const getAllProductsBySortComapnyFilterAsync = createAsyncThunk(
  "product/filter/sort",
  async (data) => {
    const response = await getAllProductsBySortComapnyFilter(data);
    return response.data;
  }
);

export const getAllProductsByKeywordFilterAsync = createAsyncThunk(
  "product/filter/keyword",
  async (keyword) => {
    const response = await getAllProductsByKeywordFilter(keyword);
    return response.data;
  }
);
export const getAllProductsBySortPriceFilterAsync = createAsyncThunk(
  "product/filter/sort/price",
  async (keyword) => {
    const response = await getAllProductsBySortPriceFilter(keyword);
    return response.data;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (buider) => {
    buider
      .addCase(getAllProductsAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        const { products } = action.payload;
        state.fetching = false;
        state.products = products;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getSingleProductAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getSingleProductAsync.fulfilled, (state, action) => {
        const { product } = action.payload;
        state.fetching = false;
        state.singleProduct = product;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getSingleProductAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getAllProductByHeadTypeFilterAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(
        getAllProductByHeadTypeFilterAsync.fulfilled,
        (state, action) => {
          const { products } = action.payload;
          state.products = products;

          state.fetching = false;

          state.productToggle = state.productToggle ? false : true;
        }
      )
      .addCase(getAllProductByHeadTypeFilterAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getAllProductsByCompanyFilterAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(
        getAllProductsByCompanyFilterAsync.fulfilled,
        (state, action) => {
          const { products } = action.payload;
          state.fetching = false;
          state.products = products;
          state.productToggle = state.productToggle ? false : true;
        }
      )
      .addCase(getAllProductsByCompanyFilterAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getAllProductsBySortComapnyFilterAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(
        getAllProductsBySortComapnyFilterAsync.fulfilled,
        (state, action) => {
          const { products } = action.payload;
          state.fetching = false;
          state.products = products;
          state.productToggle = state.productToggle ? false : true;
        }
      )
      .addCase(
        getAllProductsBySortComapnyFilterAsync.rejected,
        (state, action) => {
          state.fetching = false;
          state.error = action.payload;
          state.productToggle = state.productToggle ? false : true;
        }
      )
      .addCase(getAllProductsByColourFilterAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getAllProductsByColourFilterAsync.fulfilled, (state, action) => {
        const { products } = action.payload;
        state.fetching = false;
        state.products = products;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getAllProductsByColourFilterAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getAllProductsByPriceFilterAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getAllProductsByPriceFilterAsync.fulfilled, (state, action) => {
        const { products } = action.payload;
        state.fetching = false;
        state.products = products;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getAllProductsByPriceFilterAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.productToggle = state.productToggle ? false : true;
      })

      .addCase(getAllProductsByKeywordFilterAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(
        getAllProductsByKeywordFilterAsync.fulfilled,
        (state, action) => {
          const { products } = action.payload;
          state.fetching = false;
          state.products = products;
          state.productToggle = state.productToggle ? false : true;
        }
      )
      .addCase(getAllProductsByKeywordFilterAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
        state.productToggle = state.productToggle ? false : true;
      })
      .addCase(getAllProductsBySortPriceFilterAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(
        getAllProductsBySortPriceFilterAsync.fulfilled,
        (state, action) => {
          const { products } = action.payload;
          state.fetching = false;
          state.products = products;
          state.productToggle = state.productToggle ? false : true;
        }
      )
      .addCase(
        getAllProductsBySortPriceFilterAsync.rejected,
        (state, action) => {
          state.fetching = false;
          state.error = action.payload;
          state.productToggle = state.productToggle ? false : true;
        }
      );
  },
});

export const products = (state) => state.product.products;
export const fetching = (state) => state.product.fetching;
export const singleProduct = (state) => state.product.singleProduct;
export const productToggle = (state) => state.product.productToggle;

export default productSlice.reducer;
