import FormikForm from "@/components/formik/FormikForm";
import Input from "@/components/formik/Input";
import { Link } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
};

const SignUp = () => {
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
          <Input name="name" label="Name" />
          <Input name="email" label="Email" type="email" />
          <Input name="Password" label="Password" type="password" />
          <Input name="phone" label="Prone" />
          <Input name="address" label="Address" />
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md py-3 font-semibold"
          >
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
