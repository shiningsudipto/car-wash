import SectionTitle from "@/components/reUsable/SectionTitle";
import { Link, useLocation } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { formatDateToDDMMYYYY } from "@/utils/utils";
import FormikForm from "@/components/formik/FormikForm";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import Input from "@/components/formik/Input";

const Book = () => {
  const location = useLocation();
  const selectedSlot = location.state;
  const serviceDetails = selectedSlot[0];
  const slotDetails = selectedSlot[1];

  const userInfo = useAppSelector(useCurrentUser);

  const initialValues = {
    name: userInfo.name,
    email: userInfo.email,
    time: `${slotDetails?.startTime} - ${slotDetails?.endTime}`,
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  console.log(selectedSlot);
  return (
    <div className="container pt-[70px]">
      <SectionTitle
        title="Secure Your Slot"
        subTitle="Choose your preferred service slot and complete your booking with ease"
      />
      <div className="grid grid-cols-2 lg:gap-x-[70px]">
        <div>
          <div className="flex flex-col gap-y-5">
            <div className="bg-primary-foreground/5 p-5 rounded-md">
              <h2 className="text-xl font-semibold text-primary-foreground mb-5">
                Service Details
              </h2>
              <h3 className="text-xl font-semibold mb-2">
                {serviceDetails?.name}
              </h3>
              <p className="">{serviceDetails?.description.slice(0, 50)}</p>
              <div className="flex gap-x-5 w-full mt-2">
                <p className="font-medium">
                  Duration: {serviceDetails?.duration}
                </p>
                <p className="font-medium flex items-center">
                  Price: {serviceDetails?.price} <BsCurrencyDollar />{" "}
                </p>
              </div>
            </div>
            <div className={`p-5 rounded-md bg-primary-foreground/5`}>
              <h2 className="text-xl font-semibold text-primary-foreground mb-5">
                Slot Details
              </h2>
              <p className="">
                Status:{" "}
                <span className="font-medium capitalize">
                  {slotDetails?.isBooked}
                </span>
              </p>
              <p>
                Date:{" "}
                <span className="font-medium">
                  {formatDateToDDMMYYYY(slotDetails.date)}
                </span>
              </p>
              <div className="flex gap-x-5">
                <p>
                  Start time:{" "}
                  <span className="font-medium">{slotDetails?.startTime}</span>
                </p>
                <p>
                  End time:{" "}
                  <span className="font-medium">{slotDetails?.endTime}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FormikForm initialValues={initialValues} onSubmit={onSubmit}>
            <Input name="name" label="Name" readOnly />
            <Input name="email" label="Email" readOnly />
            <Input name="time" label="Time" readOnly />
            <button type="submit" className="form-submit-btn">
              Pay Now
            </button>
          </FormikForm>
        </div>
      </div>
    </div>
  );
};

export default Book;
