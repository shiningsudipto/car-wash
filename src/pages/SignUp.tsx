import FormikForm from "@/components/formik/FormikForm";
import Input from "@/components/formik/Input";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
};

const SignUp = () => {
  const [userInfo] = useRegistrationMutation();
  const onSubmit = async (values) => {
    try {
      const response = await userInfo(values).unwrap();
      console.log("response", response);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.error("Error submitting form:", error?.data?.message);
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
          <Input name="name" label="Name" />
          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Password" type="password" />
          <Input name="phone" label="Prone" />
          <Input name="address" label="Address" />
          <button type="submit" className="form-submit-btn">
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
