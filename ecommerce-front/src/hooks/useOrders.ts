import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import actGetOrders from "@/store/ordersSlice/actions/actGetOrders";
import { resetPlaceOrderStatus } from "@/store/ordersSlice/ordersSlice";
import { TProduct } from "@/interfaces/interfaces";
const useOrders = () => {
  const dispatch = useAppDispatch();
  const { error, loading, ordersList } = useAppSelector(
    (state) => state.orders
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productDetails = ordersList.find((order) => order.id === id);
    const newItems = productDetails?.items ?? [];

    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetPlaceOrderStatus());
    };
  }, [dispatch]);

  return {
    error,
    loading,
    ordersList,
    selectedProduct,
    showModal,
    handleClose,
    viewDetailsHandler,
  };
};
export default useOrders;
