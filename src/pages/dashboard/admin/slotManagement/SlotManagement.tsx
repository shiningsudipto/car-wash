import Dropdown from "@/components/formik/Dropdown";
import CustomModal from "@/components/reUsable/CustomModal";
import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetAllSlotsQuery } from "@/redux/features/slot";
import { TSlotWithService } from "@/types";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";

const slotStatusOptions = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Cancel",
    value: "canceled",
  },
];

type TInitialValues = {
  isBooked: string;
};

const SlotManagement = () => {
  const { data, isLoading } = useGetAllSlotsQuery(undefined);
  // modal
  const [isSlotUpdateModalOpen, setSlotUpdateModalOpen] = useState(false);
  // utils
  const [selectedSlot, setSelectedSlot] = useState<TSlotWithService | null>(
    null
  );

  const initialValues = {
    isBooked: selectedSlot?.isBooked || "",
  };

  const handleUpdateSlot = async (values: TInitialValues) => {
    console.log(values);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="">
        <SectionTitle
          title="Slot Management"
          subTitle="Overview and manage slot"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((slot: TSlotWithService) => {
                const isBooked = slot.isBooked === "booked";
                return (
                  <tr key={slot._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b border-gray-200">
                      {slot.service.name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {new Date(slot.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {slot.startTime}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {slot.endTime}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {slot.isBooked}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <button
                        disabled={isBooked}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setSlotUpdateModalOpen(true);
                        }}
                        className="text-white bg-primary-foreground py-1 px-4 rounded-md font-medium disabled:bg-slate-300 disabled:text-slate-950 "
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal
        isOpen={isSlotUpdateModalOpen}
        setIsOpen={setSlotUpdateModalOpen}
      >
        <Formik initialValues={initialValues} onSubmit={handleUpdateSlot}>
          {({ setFieldValue }: FormikProps<TInitialValues>) => {
            return (
              <Form className="space-y-5">
                <Dropdown
                  name="isBooked"
                  options={slotStatusOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Select status"
                />
                <button className="form-submit-btn w-full">Submit</button>
              </Form>
            );
          }}
        </Formik>
      </CustomModal>
    </>
  );
};

export default SlotManagement;
