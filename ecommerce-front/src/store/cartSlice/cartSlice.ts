import { ICart } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit/react";
import { getCartTotalQuantitySelector } from "../selectors";
import actGetProductsByItems from "./actions/actGetProductsByItems";
import { isString } from "@/services/guads";
const initialState: ICart = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    changeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    removeItem: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (product) => product.id !== action.payload
      );
    },
    productCartCleanUp: (state) => {
      state.productsFullInfo = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetProductsByItems.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProductsByItems.fulfilled, (state, action) => {
        state.loading = "successed";
        state.productsFullInfo = action.payload;
      })
      .addCase(actGetProductsByItems.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export { getCartTotalQuantitySelector };
export const {
  addToCart,
  changeQuantity,
  clearCartAfterPlaceOrder,
  removeItem,
  productCartCleanUp,
} = cartSlice.actions;
export default cartSlice.reducer;
