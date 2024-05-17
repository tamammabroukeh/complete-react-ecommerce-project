import { TProduct } from "@/interfaces/interfaces";
import { CartItem } from "..";

type CartItemProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItemList = ({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: CartItemProps) => {
  const renderCartItems = products.map((product) => {
    return (
      <CartItem
        key={product.id}
        {...product}
        changeQuantityHandler={changeQuantityHandler}
        removeItemHandler={removeItemHandler}
      />
    );
  });
  return <>{renderCartItems}</>;
};

export default CartItemList;
