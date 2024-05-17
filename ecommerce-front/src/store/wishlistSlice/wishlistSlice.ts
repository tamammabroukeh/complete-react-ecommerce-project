import { IWishlistState, TProduct } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./actions/actLikeToggle";
import actGetWishlist from "./actions/actGetWishlist";
import { isString } from "@/services/guads";
import { authLogout } from "../auth/authSlice";

const initialState: IWishlistState = {
  itemsId: [],
  error: null,
  loading: "idle",
  productsFullInfo: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productsFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },
  // toggle like and dislike
  extraReducers: (builder) => {
    builder
      .addCase(actLikeToggle.pending, (state) => {
        state.error = null;
      })
      .addCase(actLikeToggle.fulfilled, (state, action) => {
        if (action.payload.type === "add") {
          state.itemsId.push(action.payload.id);
        } else {
          state.itemsId = state.itemsId.filter(
            (element) => element !== action.payload.id
          );
          state.productsFullInfo = state.productsFullInfo.filter(
            (element) => element.id !== action.payload.id
          );
        }
      })
      .addCase(actLikeToggle.rejected, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    // get wishlist items
    builder
      .addCase(actGetWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetWishlist.fulfilled, (state, action) => {
        state.loading = "successed";
        if (action.payload.dataType === "productsIds") {
          state.itemsId = action.payload.data as number[];
        } else if (action.payload.dataType === "productsFullInfo") {
          state.productsFullInfo = action.payload.data as TProduct[];
        } else {
          state.itemsId = [];
          state.productsFullInfo = [];
        }
      })
      .addCase(actGetWishlist.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    // when reset logout
    builder.addCase(authLogout, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
    });
  },
});
export const { productsFullInfoCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;
