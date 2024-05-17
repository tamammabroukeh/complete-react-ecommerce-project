import notFound from "../../../assets/lottie-animations/notFound.json";
import loading from "../../../assets/lottie-animations/loading.json";
import error from "../../../assets/lottie-animations/error.json";
import empty from "../../../assets/lottie-animations/empty.json";
import success from "../../../assets/lottie-animations/success.json";
import Lottie from "lottie-react";
import { ILottieHandler } from "@/interfaces/interfaces";

export const lottieTypes = {
  notFound,
  loading,
  error,
  empty,
  success,
};

const LottieHandler = ({ type, className, message }: ILottieHandler) => {
  const lottie = lottieTypes[type];

  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px" };
  const widthAnimation = type === "notFound" ? "500px" : "300px";
  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={{ width: widthAnimation }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
