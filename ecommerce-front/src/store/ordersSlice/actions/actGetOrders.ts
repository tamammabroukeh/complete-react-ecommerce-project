import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { RootState } from "@/store";
import { AxiosErrorHandler } from "@/utils";
import axios from "axios";
import { IOrderItem } from "@/interfaces/interfaces";

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue, signal } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const response = await axios.get<IOrderItem[]>(
        `/orders?userId=${auth.user?.id}`,
        {
          signal,
        }
      );
      const orders = response.data.map((order) => {
        return {
          id: order.id,
          items: order.items,
          subtotal: order.subtotal,
        };
      });
      return orders;
    } catch (error) {
      rejectWithValue(AxiosErrorHandler(error));
    }
  }
);
export default actGetOrders;
