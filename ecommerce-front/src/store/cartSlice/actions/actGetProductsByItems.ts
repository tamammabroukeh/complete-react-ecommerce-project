import { TProduct } from "@/interfaces/interfaces";
import { RootState } from "@/store";
import { AxiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    // console.log(cart);
    const itemsId = Object.keys(cart.items);
    // console.log(itemsId);
    if (!itemsId.length) {
      return fulfillWithValue([]);
    }
    try {
      const concatenatedItemsId = itemsId
        .map((element) => `id=${element}`)
        .join("&");
      // console.log(concatenatedItemsId);
      const response = await axios.get<TProduct[]>(
        `/products?${concatenatedItemsId}`,
        { signal }
      );
      const data = response.data;
      //   console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);
export default actGetProductsByItems;
