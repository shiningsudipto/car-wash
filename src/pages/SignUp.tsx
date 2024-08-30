import FormikForm from "@/components/formik/FormikForm";
import Input from "@/components/formik/Input";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { TErrorResponse } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type TInitialValues = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};

const initialValues: TInitialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
};

const SignUp = () => {
  const [userInfo] = useRegistrationMutation();
  const navigate = useNavigate();
  const onSubmit = async (values: TInitialValues) => {
    const toastId = toast.loading("Please wait account is creating");
    try {
      const response = await userInfo(values).unwrap();
      toast.success(response.message, { id: toastId, duration: 2000 });
      if (await response.success) {
        navigate("/sign-in");
        toast.info("Please sign in", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      const err = error as TErrorResponse;
      toast.error(err.data.errorMessages[0].message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
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
          className="lg:w-[480px] w-full bg-slate-50 p-5 rounded-md"
        >
          <Input name="name" label="Name" />
          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Password" type="password" />
          <Input name="phone" label="Phone" />
          <Input name="address" label="Address" />
          <button type="submit" className="form-submit-btn w-full">
            Sing up
          </button>
          <p>
            Already have an account?{" "}
            <Link
              to={"/sign-in"}
              className="text-primary-foreground font-semibold"
            >
              Sign in!
            </Link>
          </p>
        </FormikForm>
      </div>
    </div>
  );
};

export default SignUp;
