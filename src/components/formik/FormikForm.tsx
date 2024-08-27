/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { ReactNode } from "react";

interface FormikFormProps<T extends object> {
  initialValues: T;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
  children: ReactNode;
}

const FormikForm = <T extends object>({
  initialValues,
  onSubmit,
  children,
}: FormikFormProps<T>) => {
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }: FormikProps<T>) => {
          return <Form>{children}</Form>;
        }}
      </Formik>
    </div>
  );
};

export default FormikForm;
