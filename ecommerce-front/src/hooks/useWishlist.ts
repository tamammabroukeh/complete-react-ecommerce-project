import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import actGetWishlist from "@/store/wishlistSlice/actions/actGetWishlist";
import { productsFullInfoCleanUp } from "@/store/wishlistSlice/wishlistSlice";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { error, loading, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );

  const { items } = useAppSelector((state) => state.cart);
  const records = productsFullInfo.map((record) => {
    return {
      ...record,
      quantity: items[record.id] || 0,
      isLiked: true,
      isAuthenticated: true,
    };
  });

  useEffect(() => {
    const promise = dispatch(actGetWishlist("productsFullInfo"));
    return () => {
      promise.abort();
      dispatch(productsFullInfoCleanUp());
    };
  }, [dispatch]);
  return { error, loading, records };
};

export default useWishlist;
