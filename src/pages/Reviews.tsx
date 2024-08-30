import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetAllRatingsQuery } from "@/redux/features/rating";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { formatDateToDDMMYYYY } from "@/utils/utils";
import { TReview } from "@/types";

const Reviews = () => {
  const { data, isLoading } = useGetAllRatingsQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container lg:py-[50px]">
      <SectionTitle
        title="Customer Reviews"
        subTitle="Discover the experiences of those who have chosen our services"
      />
      <div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
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

export default Reviews;
