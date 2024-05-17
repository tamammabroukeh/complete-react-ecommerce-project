import { IRegisterInfo } from "@/interfaces/interfaces";
import { AxiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: IRegisterInfo, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post("/register", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;
