import { isAxiosError } from "axios";
const AxiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return (
      error.response?.data || error.response?.data.message || error.message
    );
  } else {
    return "An Unknown Error";
  }
};

export default AxiosErrorHandler;
