import { getCartTotalQuantitySelector } from "@/store/selectors";
import CartLogo from "@assets/svg/cart.svg?react";
import Wishlist from "@assets/svg/wishlist.svg?react";
import { useAppSelector } from "@/store/hook";
import { HeaderCounter } from "@components/eCommerce";
import classes from "./styles.module.css";
const { headerLeftBar } = classes;
const HeaderLeftBar = () => {
  const cartQuantity = useAppSelector(getCartTotalQuantitySelector);
  const wishlistQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        title="Wishlist"
        to="/wishlist"
        quantity={wishlistQuantity}
        svgIcon={<Wishlist />}
      />
      <HeaderCounter
        title="Cart"
        to="/cart"
        quantity={cartQuantity}
        svgIcon={<CartLogo />}
      />
    </div>
  );
};

export default HeaderLeftBar;
