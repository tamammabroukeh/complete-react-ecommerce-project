import { IProductInfo } from "@/interfaces/interfaces";
import styles from "./styles.module.css";
const ProductInfo = ({
  children,
  direction = "column",
  img,
  price,
  quantity,
  style,
  title,
}: IProductInfo) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{price} $</h3>
        {quantity && <h3>Total Quantity: {quantity}</h3>}
        {quantity && <h3>Total price: {quantity * price}</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
