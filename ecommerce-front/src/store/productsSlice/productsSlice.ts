import { IProductsState } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCategoryPrefix from "./actions/actGetProductsByCategoryPrefix";
import { isString } from "@/services/guads";

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productssSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
      state.error = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetProductsByCategoryPrefix.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProductsByCategoryPrefix.fulfilled, (state, action) => {
        state.loading = "successed";
        state.records = action.payload;
      })
      .addCase(actGetProductsByCategoryPrefix.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        // or
        // state.error = action.payload as string;
      });
  },
});
export const { productsCleanUp } = productssSlice.actions;
export { actGetProductsByCategoryPrefix };
export default productssSlice.reducer;
