import { AxiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IFormData {
  email: string;
  password: string;
}
type TResponse = {
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  } | null;
  accessToken: string | null;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: IFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TResponse>("/login", formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
