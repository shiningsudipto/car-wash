import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetServiceDetailsQuery } from "@/redux/features/service";
import { Link, useParams } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { TService, TSlot } from "@/types";
import { formatDateToDDMMYYYY } from "@/utils/utils";

interface InitialValues {
  slot: string;
}

const initialValues: InitialValues = {
  slot: "",
};

const Details = () => {
  const params = useParams();
  const serviceId = params?.id;
  const { data, isLoading } = useGetServiceDetailsQuery({ id: serviceId });
  const [selectedSlot, setSetSelectedSlot] = useState<(TService | TSlot)[]>([]);
  const serviceDetails = data?.data?.service as TService;
  const availableSlots = data?.data?.slots;

  const onSubmit = (values: InitialValues) => {
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
      {availableSlots.length === 0 && (
        <div className="my-10 text-xl font-medium text-center">
          No available slot
        </div>
      )}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }: FormikProps<InitialValues>) => {
          return (
            <Form className="">
              <div className="grid grid-cols-3 gap-5">
                <Field name="slot">
                  {({ field }: FieldProps) => {
                    return availableSlots?.map((option: TSlot) => {
                      const checkedValue = field?.value === option?._id;
                      const isBooked = option.isBooked === "booked";
                      return (
                        <div key={option._id} className={``}>
                          <input
                            disabled={isBooked}
                            type="radio"
                            id={option?._id}
                            {...field}
                            value={option?._id}
                            checked={checkedValue}
                            className={`hidden radio`}
                            onClick={() =>
                              setSetSelectedSlot([serviceDetails, option])
                            }
                          />
                          <label
                            htmlFor={option?._id}
                            className={`${
                              isBooked ? "cursor-default" : "cursor-pointer"
                            } `}
                          >
                            <div
                              key={option?._id}
                              className={`p-5 rounded-md space-y-1 ${
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
                              <p>
                                Date:{" "}
                                <span className="font-medium">
                                  {formatDateToDDMMYYYY(option?.date)}
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
                  <Link
                    to={"/book-now"}
                    state={selectedSlot}
                    className="form-submit-btn"
                  >
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
