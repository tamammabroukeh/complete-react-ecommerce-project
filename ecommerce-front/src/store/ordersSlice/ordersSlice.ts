import { IOrderState } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit/react";
import actPlaceOrder from "./actions/actPlaceOrder";
import { isString } from "@/services/guads";
import actGetOrders from "./actions/actGetOrders";

const initialState: IOrderState = {
  ordersList: [],
  loading: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetPlaceOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // place order
    builder
      .addCase(actPlaceOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actPlaceOrder.fulfilled, (state) => {
        state.loading = "successed";
      })
      .addCase(actPlaceOrder.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    // get orders
    builder
      .addCase(actGetOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetOrders.fulfilled, (state, action) => {
        state.loading = "successed";
        if (action.payload) {
          state.ordersList = action.payload;
        }
      })
      .addCase(actGetOrders.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export default ordersSlice.reducer;

export const { resetPlaceOrderStatus } = ordersSlice.actions;
