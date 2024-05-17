import { TProduct } from "@/interfaces/interfaces";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import actPlaceOrder from "@/store/ordersSlice/actions/actPlaceOrder";
import { clearCartAfterPlaceOrder } from "@/store/cartSlice/cartSlice";
type TSubtotalPrice = { products: TProduct[]; accessToken: string | null };
const CartSubtotalPrice = ({ products, accessToken }: TSubtotalPrice) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const totalPrice = products.reduce((acumalator, current) => {
    const { price } = current;
    const { quantity } = current;
    if (quantity && typeof quantity === "number") {
      return acumalator + price * quantity;
    } else {
      return acumalator;
    }
  }, 0);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(totalPrice))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with Subtotal:{" "}
          {totalPrice.toFixed(2)}$
          {!loading && error && (
            <p style={{ color: "#DC3435", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={placeOrderHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{totalPrice}$</span>
      </div>
      {accessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              onClick={modalHandler}
              variant="info"
              style={{ color: "white" }}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
