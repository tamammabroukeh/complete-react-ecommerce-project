import actAuthLogin from "@/store/auth/actions/actAuthLogin";
import { resetUI } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { SignInType, signInSchema } from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitHandler: SubmitHandler<SignInType> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    console.log(data);
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
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
    submitHandler,
    register,
    handleSubmit,
    formErrors,
    searchParams,
  };
};

export default useLogin;
