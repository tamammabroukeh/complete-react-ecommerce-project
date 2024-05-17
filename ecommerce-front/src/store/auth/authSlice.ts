import { IRegisterState } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./actions/actAuthRegister";
import { isString } from "@/services/guads";
import actAuthLogin from "@/store/auth/actions/actAuthLogin";

const initialState: IRegisterState = {
  accessToken: null,
  user: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    authLogout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder
      .addCase(actAuthRegister.pending, (state) => {
        state.error = null;
        state.loading = "pending";
      })
      .addCase(actAuthRegister.fulfilled, (state) => {
        state.loading = "successed";
      })
      .addCase(actAuthRegister.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    // login
    builder
      .addCase(actAuthLogin.pending, (state) => {
        state.error = null;
        state.loading = "pending";
      })
      .addCase(actAuthLogin.fulfilled, (state, action) => {
        state.loading = "successed";
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(actAuthLogin.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
