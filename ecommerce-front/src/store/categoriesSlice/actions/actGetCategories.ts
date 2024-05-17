import { TCategory } from "@/interfaces/interfaces";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosErrorHandler } from "@/utils";
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TCategory[]>(`/categories`, { signal });
      const data = response.data;
      //   const maping = data.map((element) => element.id)
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);
export default actGetCategories;
