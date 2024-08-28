import FormikForm from "@/components/formik/FormikForm";
import Input from "@/components/formik/Input";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
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
          <Input name="Password" label="Password" type="password" />
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
