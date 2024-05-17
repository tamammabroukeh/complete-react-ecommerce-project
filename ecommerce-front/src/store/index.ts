import { configureStore } from "@reduxjs/toolkit/react";
import categoriesReducer from "./categoriesSlice/categoriesSlice";
import productsReducer from "./productsSlice/productsSlice";
import cartReducer from "./cartSlice/cartSlice";
import { combineReducers } from "@reduxjs/toolkit";
import WishlistReducer from "./wishlistSlice/wishlistSlice";
import ordersReducer from "./ordersSlice/ordersSlice";
import authReducer from "./auth/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"],
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  categories: categoriesReducer,
  products: productsReducer,
  orders: ordersReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishlist: WishlistReducer,
  // wishlist: persistReducer(wishlistPersistConfig, WishlistReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  // reducer: {
  //   categories: categoriesReducer,
  //   products: productsReducer,
  //   cart: cartReducer,
  // },
  // reducer: persistedReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { persistor, store };
