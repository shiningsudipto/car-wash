import FormikRating from "@/components/formik/FormikRating";
import Textarea from "@/components/formik/Textarea";
import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetLatestTwoRatingsQuery } from "@/redux/features/rating";
import { Form, Formik } from "formik";
import CountUp from "react-countup";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { formatDateToDDMMYYYY } from "@/utils/utils";

type TInitialValues = {
  feedback: string;
  rating: number;
};

const initialValues: TInitialValues = {
  feedback: "",
  rating: 4,
};

const Review = () => {
  const { data, isLoading } = useGetLatestTwoRatingsQuery(undefined);
  console.log(data?.data);

  const onSubmit = (values) => {
    console.log(values);
  };

  if (isLoading) {
    return <Loader />;
  }

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
                Average rating:{" "}
                <span className="text-3xl font-bold">
                  {data.data.averageRating}
                </span>
              </p>
            </div>
            <p className="text-xl font-medium mt-5">Total ratings:</p>
            <CountUp
              className="text-5xl font-bold "
              start={0}
              end={data.data.totalRating}
              duration={10}
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
      <div className="mt-10">
        <div className="flex justify-center">
          <h3 className="text-2xl font-semibold text-center flex items-center mb-5">
            <RiDoubleQuotesL className="text-primary" /> Latest Customer
            Feedback <RiDoubleQuotesR className="text-primary" />
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-x-[70px] ">
          {data?.data?.result?.map((item) => {
            return (
              <div
                key={item?._id}
                className="space-y-2 bg-blue-100 p-5 rounded-md"
              >
                <p className="font-medium text-lg">{item?.name}</p>
                <p className="flex items-center gap-x-1 font-medium">
                  Rated: {item?.rating} <FaStar className="text-primary" />
                </p>
                <p className="flex items-center gap-x-1 font-medium ">
                  Date: {formatDateToDDMMYYYY(item.createdAt)}
                </p>
                <p className="flex items-center text-xl font-medium">
                  <RiDoubleQuotesL /> {item?.feedback} <RiDoubleQuotesR />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Review;
