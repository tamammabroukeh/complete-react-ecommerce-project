import { Heading } from "@/components/common";
import { CartSubtotalPrice } from "@/components/eCommerce";
import { Loading, LottieHandler } from "@/components/feedback";
import { CartItemList } from "@/components/eCommerce";
import useCart from "@/hooks/useCart";

const Cart = () => {
  // console.log("fire");
  const {
    changeQuantityHandler,
    error,
    accessToken,
    loading,
    products,
    placeOrderStatus,
    removeItemHandler,
  } = useCart();
  return (
    <>
      <Heading title="Your cart" />
      <Loading error={error} status={loading} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} accessToken={accessToken} />
          </>
        ) : placeOrderStatus === "successed" ? (
          <LottieHandler
            type="success"
            message={"Your order has been placed successfully"}
          />
        ) : (
          <LottieHandler type="empty" message={"Your cart is empty"} />
        )}
      </Loading>
    </>
  );
};

export default Cart;
