import FormikRating from "@/components/formik/FormikRating";
import Textarea from "@/components/formik/Textarea";
import SectionTitle from "@/components/reUsable/SectionTitle";
import { Form, Formik } from "formik";
import CountUp from "react-countup";

type TInitialValues = {
  feedback: string;
  rating: number;
};

const initialValues: TInitialValues = {
  feedback: "",
  rating: 4,
};

const Review = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="container mt-14">
      <SectionTitle
        title="What Our Customers Are Saying"
        subTitle="Discover why our clients love what we do"
      />
      <div className="flex justify-between gap-x-[70px]">
        <div className="w-[50%] bg-primary-foreground p-5 rounded-md text-white">
          <h3 className="text-2xl font-semibold mb-5">Our Customers Love Us</h3>
          <h4 className="text-xl font font-medium">
            See the average rating based on customer feedback and reviews.
          </h4>
          <div className="flex flex-col items-center mt-5">
            <div>
              <p className="text-xl font-medium">
                Average rating: <span className="text-3xl font-bold">4.8</span>
              </p>
            </div>
            <p className="text-xl font-medium mt-5">Total ratings:</p>
            <CountUp
              className="text-5xl font-bold "
              start={0}
              end={500}
              duration={50}
              delay={2}
            ></CountUp>
          </div>
        </div>
        <div className="w-[50%]">
          <h3 className="text-2xl font-semibold mb-5">Rate Your Experience</h3>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ setFieldValue, values }: FormikProps<T>) => {
              return (
                <Form className="space-y-5">
                  <Textarea name="feedback" label="Your feedback" />
                  <FormikRating
                    label="Rate us"
                    setFieldValue={setFieldValue}
                    name="rating"
                    value={values?.rating}
                  />
                  <button className="py-2 px-6 bg-primary text-white font-semibold rounded-md">
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Review;
