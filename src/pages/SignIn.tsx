import FormikForm from "@/components/formik/FormikForm";
import Input from "@/components/formik/Input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialValues = {
  email: "cwuser@gmail.com",
  password: "123456",
};

const SignIn = () => {
  const [userInfo] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Logging in");
    try {
      const response = await userInfo(values).unwrap();

      const user = verifyToken(response.token) as TUser;
      dispatch(setUser({ user: user, token: response.token }));

      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message, { id: toastId, duration: 2000 });
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="container py-10">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold mb-5">Sign up</h2>
        <FormikForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          className="w-[480px] bg-slate-50 p-5 rounded-md"
        >
          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Password" type="password" />
          <button type="submit" className="form-submit-btn">
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
