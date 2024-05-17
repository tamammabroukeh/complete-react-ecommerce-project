import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@/interfaces/interfaces";
import { AxiosErrorHandler } from "@/utils";
import { RootState } from "@/store";

type TDataType = "productsIds" | "productsFullInfo" | "empty";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const wishlistUser = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth?.user?.id}`,
        { signal }
      );
      // console.log(wishlistUser);

      if (!wishlistUser.data.length) {
        return { data: [], dataType: "empty" };
      }
      if (dataType === "productsIds") {
        const concatenatedItemsId = wishlistUser.data.map(
          (element) => element.productId
        );
        return { data: concatenatedItemsId, dataType: "productsIds" };
      } else {
        const concatenatedItemsId = wishlistUser.data
          .map((element) => `id=${element.productId}`)
          .join("&");
        console.log(concatenatedItemsId);
        const response = await axios.get<TProduct[]>(
          `/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);
export default actGetWishlist;
