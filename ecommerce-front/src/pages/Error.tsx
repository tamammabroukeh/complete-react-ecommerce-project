import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LottieHandler } from "@/components/feedback";
// import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
const Error = () => {
  // const error = useRouteError();

  // let errorStatus: number;
  // let errorStatusText: string;

  // if (isRouteErrorResponse(error)) {
  //   errorStatus = error.status;
  //   errorStatusText = error.statusText;
  // } else {
  //   errorStatus = 404;
  //   errorStatusText = "Page Not Found";
  // }

  return (
    <Container>
      {/* <h1>{errorStatus}</h1>
      <p>{errorStatusText}</p> */}
      <div className="d-flex flex-column align-items-center">
        {/* <Lottie
          animationData={LottieHandler}
          style={{
            width: "500px",
          }}
        /> */}
        <LottieHandler type="notFound" className="" />
        <Link to="/" replace>
          How about going back to safety?
        </Link>
      </div>
    </Container>
  );
};

export default Error;
