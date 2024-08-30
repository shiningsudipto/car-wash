import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetMyBookingQuery } from "@/redux/features/booking";
import { TBooking } from "@/types/booking.type";

const PastBookings = () => {
  const { data, isLoading, error } = useGetMyBookingQuery(undefined);
  const bookingData = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      <SectionTitle
        title="Past Bookings"
        subTitle="Review your past booking details"
      />
      {error && (
        <div className="text-center w-full">
          <p className="text-xl font-semibold">You didn't book any service</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Service Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Vehicle Type
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Vehicle Brand
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Vehicle Model
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Slot Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                End Time
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Registration Plate
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingData?.map((booking: TBooking) => (
              <tr key={booking?._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.service.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.vehicleType}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.vehicleBrand}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.vehicleModel}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {new Date(booking.slot.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.slot.startTime}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.slot.endTime}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.registrationPlate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastBookings;
