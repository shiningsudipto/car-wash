import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetServiceDetailsQuery } from "@/redux/features/service";
import { Link, useParams } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import FormikForm from "@/components/formik/FormikForm";
import { Field, FieldProps, Form, Formik } from "formik";

const initialValues = {
  slot: "",
};

const Details = () => {
  const params = useParams();
  const serviceId = params?.id;
  const { data, isLoading } = useGetServiceDetailsQuery({ id: serviceId });
  const serviceDetails = data?.data?.service;
  const availableSlots = data?.data?.slots;
  console.log(serviceDetails, availableSlots);

  const onSubmit = (values) => {
    console.log(values);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <SectionTitle
        title={serviceDetails?.name}
        subTitle={serviceDetails?.description}
      />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }: FormikProps<T>) => {
          return (
            <Form className="">
              <div className="grid grid-cols-3 gap-5">
                <Field name="slot">
                  {({ field }: FieldProps) => {
                    return availableSlots?.map((option) => {
                      const checkedValue = field?.value === option?._id;
                      console.log(field?.value);
                      return (
                        <div key={option._id} className={``}>
                          <input
                            type="radio"
                            id={option?._id}
                            {...field}
                            value={option?._id}
                            checked={checkedValue}
                            className={`hidden radio`}
                          />
                          <label
                            htmlFor={option?._id}
                            className={`cursor-pointer`}
                          >
                            <div
                              key={option?._id}
                              className={`p-5 rounded-md ${
                                checkedValue
                                  ? "bg-primary text-white"
                                  : "bg-primary-foreground/5"
                              }`}
                            >
                              <h3 className={`text-xl font-semibold mb-2`}>
                                {serviceDetails?.name}
                              </h3>
                              <p className="">{serviceDetails?.description}</p>
                              <p className="">
                                Status:{" "}
                                <span className="font-medium capitalize">
                                  {option?.isBooked}
                                </span>
                              </p>
                              <p className="font-medium flex items-center">
                                Price: {serviceDetails?.price}{" "}
                                <BsCurrencyDollar />{" "}
                              </p>
                              <div className="flex gap-x-5">
                                <p>
                                  Start time:{" "}
                                  <span className="font-medium">
                                    {option?.startTime}
                                  </span>
                                </p>
                                <p>
                                  End time:{" "}
                                  <span className="font-medium">
                                    {option?.endTime}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      );
                    });
                  }}
                </Field>
              </div>
              <div className="pt-10 text-end">
                {values?.slot && (
                  <Link to={"/book"} className="form-submit-btn">
                    Book This Service
                  </Link>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Details;

{
  /* <div className="grid grid-cols-3 gap-5">
  {availableSlots?.length === 0 ? (
    <p>No available slots</p>
  ) : (
    availableSlots?.map((item) => {
      return (
        <div
          key={item?._id}
          className="bg-primary-foreground/5 hover:bg-primary-foreground/10 p-5 rounded-md cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-2">
            {serviceDetails?.name}
          </h3>
          <p className="">{serviceDetails?.description}</p>
          <p className="">
            Status:{" "}
            <span className="font-medium capitalize">
              {item?.isBooked}
            </span>
          </p>
          <p className="font-medium flex items-center">
            Price: {serviceDetails?.price} <BsCurrencyDollar />{" "}
          </p>
          <div className="flex gap-x-5">
            <p>
              Start time:{" "}
              <span className="font-medium">{item?.startTime}</span>
            </p>
            <p>
              End time:{" "}
              <span className="font-medium">{item?.endTime}</span>
            </p>
          </div>
        </div>
      );
    })
  )}
</div> */
}
