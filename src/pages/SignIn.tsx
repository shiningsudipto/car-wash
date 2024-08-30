import FormikForm from "@/components/formik/FormikForm";
import Input from "@/components/formik/Input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TErrorResponse } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type TInitialValues = {
  email: string;
  password: string;
};

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [userInfo] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: TInitialValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const response = await userInfo(values).unwrap();

      const user = verifyToken(response.token) as TUser;
      user.name = response.data.name;
      dispatch(setUser({ user: user, token: response.token }));

      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error) {
      console.error("error:", error);
      const err = error as TErrorResponse;
      toast.error(err.data.errorMessages[0].message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div className="container py-10">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold mb-5">Sign up</h2>
        <FormikForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          className="lg:w-[480px] w-full bg-slate-50 p-5 rounded-md"
        >
          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Password" type="password" />
          <button type="submit" className="form-submit-btn w-full">
            Sing in
          </button>
          <p>
            Don't have an account? please{" "}
            <Link
              to={"/sign-up"}
              className="text-primary-foreground font-semibold"
            >
              Sign up!
            </Link>
          </p>
        </FormikForm>
      </div>
    </div>
  );
};
export default SignIn;
