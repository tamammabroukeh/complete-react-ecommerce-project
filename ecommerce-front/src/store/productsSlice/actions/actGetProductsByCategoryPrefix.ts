import { TProduct } from "@/interfaces/interfaces";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosErrorHandler } from "@/utils";
const actGetProductsByCategoryPrefix = createAsyncThunk(
  "products/GetProductsByCategoryPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TProduct[]>(
        `/products?cat_prefix=${prefix}`,
        {
          signal,
        }
      );
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);
export default actGetProductsByCategoryPrefix;
