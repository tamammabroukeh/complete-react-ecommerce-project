import actGetProductsByItems from "@/store/cartSlice/actions/actGetProductsByItems";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useCallback, useEffect } from "react";
import {
  changeQuantity,
  removeItem,
  productCartCleanUp,
} from "@/store/cartSlice/cartSlice";
import { resetPlaceOrderStatus } from "@/store/ordersSlice/ordersSlice";
const useCart = () => {
  const dispatch = useAppDispatch();

  const { loading, error, items, productsFullInfo } = useAppSelector(
    (state) => state.cart
  );

  const { accessToken } = useAppSelector((state) => state.auth);
  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

  // console.log(productsFullInfo);
  const products = productsFullInfo.map((product) => {
    return { ...product, quantity: items[product.id] };
  });

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      console.log(id, quantity);
      dispatch(changeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(removeItem(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      promise.abort();
      dispatch(productCartCleanUp());
      dispatch(resetPlaceOrderStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    accessToken,
    products,
    placeOrderStatus,
    removeItemHandler,
    changeQuantityHandler,
  };
};

export default useCart;
