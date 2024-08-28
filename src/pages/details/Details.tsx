import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetServiceDetailsQuery } from "@/redux/features/service";
import { useParams } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";

const Details = () => {
  const params = useParams();
  const serviceId = params?.id;
  const { data, isLoading } = useGetServiceDetailsQuery({ id: serviceId });
  const serviceDetails = data?.data?.service;
  const availableSlots = data?.data?.slots;
  console.log(serviceDetails, availableSlots);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <SectionTitle
        title={serviceDetails?.name}
        subTitle={serviceDetails?.description}
      />
      <div className="grid grid-cols-3 gap-5">
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
      </div>
    </div>
  );
};

export default Details;
