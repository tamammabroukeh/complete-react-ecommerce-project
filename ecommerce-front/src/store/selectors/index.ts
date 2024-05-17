import { createSelector } from "@reduxjs/toolkit/react";
import { RootState } from "../index";
const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const quantity = Object.values(items).reduce((acumalator, currentValue) => {
      return acumalator + currentValue;
    }, 0);
    return quantity;
  }
);
export { getCartTotalQuantitySelector };
