import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { RootState } from "@/store";
import { AxiosErrorHandler } from "@/utils";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    const { auth, cart } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((product) => {
      return {
        id: product.id,
        img: product.img,
        price: product.price,
        title: product.title,
        quantity: cart.items[product.id],
      };
    });
    try {
      const response = await axios.post("/orders", {
        userId: auth.user?.id,
        items: orderItems,
        subtotal,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(AxiosErrorHandler(error));
    }
  }
);
export default actPlaceOrder;
