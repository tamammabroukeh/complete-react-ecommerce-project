import { ICategoriesState } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./actions/actGetCategories";
import { isString } from "@/services/guads";
const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    cleanUpCategories: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCategories.fulfilled, (state, action) => {
        state.loading = "successed";
        state.records = action.payload;
      })
      .addCase(actGetCategories.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        // or
        // state.error = action.payload as string;
      });
  },
});
export const { cleanUpCategories } = categoriesSlice.actions;
export { actGetCategories };
export default categoriesSlice.reducer;
