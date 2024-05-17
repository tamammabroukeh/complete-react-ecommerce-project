import { skeletonTypes } from "@/components/feedback/Loading/Loading";
import { lottieTypes } from "@/components/feedback/LottieHandler/LottieHandler";

export type loadingState = "idle" | "pending" | "successed" | "failed";
// categories
export type TCategory = {
  id: number;
  title: string;
  img: string;
  prefix: string;
};
export interface ICategoriesState {
  records: TCategory[];
  loading: loadingState;
  error: string | null;
}
// products
export type TProduct = {
  id: number;
  price: number;
  title: string;
  img: string;
  max?: number;
  cat_prefix?: string;
  quantity?: number;
  isLiked?: boolean;
  isAuthenticated?: boolean;
};
export interface IProductsState {
  records: TProduct[];
  loading: loadingState;
  error: string | null;
}
export interface IProductInfo {
  title: string;
  img: string;
  price: number;
  children?: React.ReactNode;
  direction?: "row" | "column";
  style?: React.CSSProperties;
  quantity?: number;
}
// Loading
// type TSkeleton = "cart" | "category" | "product";
export interface ILoading {
  status: loadingState;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
}
// Grid List
export interface IGridList<T> {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage: string;
}
export interface IHasId {
  id: number;
}

// cart
export interface ICart {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: loadingState;
  error: string | null;
}
//wishlist
export interface IWishlistState {
  itemsId: number[];
  error: string | null;
  loading: loadingState;
  productsFullInfo: TProduct[];
}
// header left bar
export interface IHeaderCounter {
  to: string;
  svgIcon: React.ReactNode;
  title: string;
  quantity: number;
}
// Lottie handler
export interface ILottieHandler {
  type: keyof typeof lottieTypes;
  message?: string;
  className?: string;
}
// Register
export interface IRegisterState {
  loading: loadingState;
  accessToken: string | null;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  } | null;
  error: string | null;
}
export interface IRegisterInfo {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
// place order
export interface IOrderItem {
  id: number;
  items: TProduct[];
  subtotal: number;
}
export interface IOrderState {
  loading: loadingState;
  error: string | null;
  ordersList: IOrderItem[];
}
