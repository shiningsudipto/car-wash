import FormikRating from "@/components/formik/FormikRating";
import Textarea from "@/components/formik/Textarea";
import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import {
  useCreateReviewMutation,
  useGetLatestTwoRatingsQuery,
} from "@/redux/features/rating";
import { Form, Formik, FormikProps } from "formik";
import CountUp from "react-countup";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { formatDateToDDMMYYYY } from "@/utils/utils";
import { useAppSelector } from "@/redux/hooks";
import { TUser, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import CustomModal from "@/components/reUsable/CustomModal";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { TErrorResponse, TReview } from "@/types";

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
  const user = useAppSelector(useCurrentUser) as TUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewInfo] = useCreateReviewMutation();

  const onSubmit = async (values: TInitialValues) => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    const toastId = toast.loading("Feedback posting");
    try {
      const response = await reviewInfo({
        email: user.email,
        name: user.name,
        rating: values.rating,
        feedback: values.feedback,
      }).unwrap();
      console.log("res", response);
      toast.success(response.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log("error", error);
      const err = error as TErrorResponse;
      toast.error(err.data.errorMessages[0].message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
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
      <CustomModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mb-5 text-lg font-medium">You need to login first</h2>
          <Link
            to={"/sign-in"}
            className="bg-primary py-2 px-6 rounded-md font-semibold text-white"
          >
            Login
          </Link>
        </div>
      </CustomModal>
      <div className="flex lg:flex-row flex-col justify-between gap-y-5 gap-x-[70px]">
        <div className="lg:w-[50%] bg-primary-foreground p-5 rounded-md text-white">
          <h3 className="text-2xl font-semibold mb-4">Our Customers Love Us</h3>
          <h4 className="text-xl font font-medium">
            See the average rating based on customer feedback and reviews.
          </h4>
          <div className="flex flex-col items-center mt-4">
            <div>
              <p className="text-xl font-medium">
                Average rating:{" "}
                <span className="text-3xl font-bold">
                  {data?.data?.averageRating}
                </span>
              </p>
            </div>
            <p className="text-xl font-medium mt-4">Total ratings:</p>
            <CountUp
              className="text-5xl font-bold "
              start={0}
              end={data?.data?.totalRating}
              duration={5}
              delay={1}
            ></CountUp>
            <Link
              to={"/reviews"}
              className="text-xl font-semibold bg-primary text-white py-2 px-6 rounded-md mt-5"
            >
              See All Reviews
            </Link>
          </div>
        </div>
        <div className="lg:w-[50%]">
          <h3 className="text-2xl font-semibold mb-5">Rate Your Experience</h3>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ setFieldValue, values }: FormikProps<TInitialValues>) => {
              return (
                <Form className="space-y-5">
                  <Textarea name="feedback" label="Your feedback" required />
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
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-5 gap-x-[70px] ">
          {data?.data?.result?.map((item: TReview) => {
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
                  Date: {formatDateToDDMMYYYY(item?.createdAt)}
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
