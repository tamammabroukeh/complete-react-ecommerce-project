import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@/interfaces/interfaces";
import { useAppDispatch } from "@/store/hook";
import { addToCart } from "@/store/cartSlice/cartSlice";
import DisLike from "@assets/svg/heart-dislike.svg?react";
import Like from "@assets/svg/heart-like.svg?react";
import { memo, useEffect, useState } from "react";
import actLikeToggle from "@/store/wishlistSlice/actions/actLikeToggle";
import ProductInfo from "../ProductInfo/ProductInfo";
const { maximumQuantity, wishlistBtn } = styles;
const Product = memo(
  ({
    img,
    price,
    title,
    id,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    console.log("fire");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const currentRemainingQuantity = max - (quantity ?? 0);

    const quantityReachedToMax = currentRemainingQuantity == 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) return;
      setIsBtnDisabled(true);

      const depounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(depounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };
    console.log(isLiked);
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item in your wishlist.
          </Modal.Body>
        </Modal>
        <ProductInfo img={img} price={price} title={title} direction="row">
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <Like />
            ) : (
              <DisLike />
            )}
          </div>
          <p className={maximumQuantity}>
            {quantityReachedToMax
              ? `You reached to the limit`
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            onClick={addToCartHandler}
            variant="info"
            style={{ color: "white", width: "100%" }}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" />
                {"   Loading..."}
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);
export default Product;
