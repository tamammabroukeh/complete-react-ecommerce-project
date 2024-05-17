import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@/interfaces/interfaces";
import { memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";
const { cartItem, cartItemSelection } = styles;

type CartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    img,
    title,
    price,
    max,
    id,
    quantity,
    changeQuantityHandler,
    removeItemHandler,
  }: CartItemProps) => {
    // console.log("render");
    const renderOptions = Array(max)
      .fill(0)
      .map((_, index) => {
        const quantity = ++index;
        return (
          <option key={quantity} value={quantity}>
            {quantity}
          </option>
        );
      });
    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };
    return (
      <div className={cartItem}>
        <ProductInfo img={img} price={price} title={title}>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </ProductInfo>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select onChange={changeQuantity} value={quantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
