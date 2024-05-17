import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IHeaderCounter } from "@/interfaces/interfaces";
const { container, iconWrapper, totalQuantity, pumpAnimate } = styles;
const HeaderCounter = ({ to, svgIcon, title, quantity }: IHeaderCounter) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!quantity) {
      return;
    }
    setIsAnimated(true);

    const debounce = setTimeout(() => {
      setIsAnimated(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [quantity]);

  const quantityStyles = `${totalQuantity} ${isAnimated ? pumpAnimate : ""}`;
  return (
    <div onClick={() => navigate(to)} className={container}>
      <div className={iconWrapper}>
        {svgIcon}
        {quantity > 0 && <div className={quantityStyles}>{quantity}</div>}
      </div>
      <h3>{title}</h3>
    </div>
  );
};
export default HeaderCounter;
