import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpType, signUpSchema } from "@/validations/signUpSchema";
import { FocusEvent } from "react";
import useCheckEmailAvailability from "@/hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import actAuthRegister from "@/store/auth/actions/actAuthRegister";
import { useNavigate } from "react-router-dom";
import { resetUI } from "@/store/auth/authSlice";
import { useEffect } from "react";
const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors: formErrors },
  } = useForm<SignUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitHandler: SubmitHandler<SignUpType> = (data) => {
    const { email, firstname, lastname, password } = data;
    dispatch(actAuthRegister({ email, firstname, lastname, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
    // console.log(data);
  };
  const {
    checkEmailAvailability,
    emailAvailabilityStatus,
    resetCheckEmailAvailability,
    enteredEmail,
  } = useCheckEmailAvailability();
  const emailOnBlurHandler = async (event: FocusEvent<HTMLInputElement>) => {
    console.log(event);
    await trigger("email");
    const { value } = event.target;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return {
    error,
    loading,
    accessToken,
    emailOnBlurHandler,
    emailAvailabilityStatus,
    submitHandler,
    register,
    handleSubmit,
    formErrors,
  };
};

export default useRegister;
