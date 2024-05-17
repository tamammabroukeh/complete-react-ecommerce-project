import { ILoading } from "@/interfaces/interfaces";
import CategorySkeleton from "../Skeletons/CategorySkeleton";
import CartSkeleton from "../Skeletons/CartSkeleton";
import ProductSkeleton from "../Skeletons/ProductSkeleton";
import TableSkeleton from "../Skeletons/TableSkeleton";
import { LottieHandler } from "..";
export const skeletonTypes = {
  cart: CartSkeleton,
  product: ProductSkeleton,
  category: CategorySkeleton,
  table: TableSkeleton,
};
const Loading = ({ children, error, status, type = "category" }: ILoading) => {
  const Component = skeletonTypes[type];
  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return <LottieHandler type="error" message={error as string} />;
  }
  return <>{children}</>;
};

export default Loading;
