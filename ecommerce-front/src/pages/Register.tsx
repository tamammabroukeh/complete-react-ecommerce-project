import { Heading } from "@/components/common";
import { Input } from "@/components/forms";
import { Navigate } from "react-router-dom";
import useRegister from "@/hooks/useRegister";
import { Row, Form, Button, Col, Spinner } from "react-bootstrap";
// type TFormInputs = {
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
//   confirmpassword: string;
// };

const Register = () => {
  const {
    error,
    loading,
    accessToken,
    emailOnBlurHandler,
    emailAvailabilityStatus,
    submitHandler,
    register,
    handleSubmit,
    formErrors,
  } = useRegister();
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title="User Registeration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitHandler)}>
            {/* first name */}
            <Input
              name="firstname"
              register={register}
              error={formErrors.firstname?.message as string}
              label="First name"
            />
            {/* last name */}
            <Input
              name="lastname"
              register={register}
              error={formErrors.lastname?.message as string}
              label="Last name"
            />
            {/* email */}
            <Input
              name="email"
              label="Email Address"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
                  : emailAvailabilityStatus === "notavailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We`re currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available to use."
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />
            {/* pasword */}
            <Input
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message as string}
              label="Password"
            />
            {/* confirm password */}
            <Input
              name="confirmpassword"
              type="password"
              register={register}
              error={formErrors.confirmpassword?.message as string}
              label="Confirm Password"
            />
            <Button
              variant="info"
              className="mb-3 text-light"
              type="submit"
              disabled={
                emailAvailabilityStatus === "checking"
                  ? true
                  : false || loading === "pending"
              }
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ marginTop: "10px", color: "#DC3545" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
