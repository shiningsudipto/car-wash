import Dropdown from "@/components/formik/Dropdown";
import Input from "@/components/formik/Input";
import CustomModal from "@/components/reUsable/CustomModal";
import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetServicesQuery } from "@/redux/features/service";
import {
  useCreateSlotMutation,
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
} from "@/redux/features/slot";
import { TErrorResponse, TSlotWithService } from "@/types";
import { servicesToDropdownOption } from "@/utils/utils";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { toast } from "sonner";

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
type TCreateSlotInitialValues = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
};

const createSlotInitialValues: TCreateSlotInitialValues = {
  service: "",
  date: "",
  startTime: "",
  endTime: "",
};

const SlotManagement = () => {
  const { data, isLoading } = useGetAllSlotsQuery(undefined);
  const { data: servicesData } = useGetServicesQuery(undefined);
  const [updateSlot] = useUpdateSlotMutation();
  const [createSlot] = useCreateSlotMutation();
  // modal
  const [isSlotUpdateModalOpen, setSlotUpdateModalOpen] = useState(false);
  const [isSlotCreateModalOpen, setSlotCreateModalOpen] = useState(false);
  // utils
  const [selectedSlot, setSelectedSlot] = useState<TSlotWithService | null>(
    null
  );

  const initialValues = {
    isBooked: selectedSlot?.isBooked || "",
  };

  const handleUpdateSlot = async (values: TInitialValues) => {
    console.log(values);
    setSlotUpdateModalOpen(false);
    const toastId = toast.loading("Slot updating");
    if (selectedSlot) {
      try {
        const response = await updateSlot({
          slotInfo: values,
          id: selectedSlot._id,
        }).unwrap();
        toast.success(response.message, { id: toastId, duration: 2000 });
      } catch (error) {
        console.log(error);
        const err = error as TErrorResponse;
        toast.error(err?.data?.errorMessages[0].message, {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };
  const handleCreateSlot = async (values: TCreateSlotInitialValues) => {
    setSlotCreateModalOpen(false);
    const toastId = toast.loading("Slot creating");
    try {
      const response = await createSlot(values).unwrap();
      toast.success(response.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log("error", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.errorMessages[0].message, {
        id: toastId,
        duration: 2000,
      });
    }
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
        <div className="flex justify-end mb-5">
          <button
            onClick={() => setSlotCreateModalOpen(true)}
            className="form-submit-btn"
          >
            Create slot
          </button>
        </div>
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
      {/* slot update */}
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
      {/* slot create */}
      <CustomModal
        isOpen={isSlotCreateModalOpen}
        setIsOpen={setSlotCreateModalOpen}
      >
        <Formik
          initialValues={createSlotInitialValues}
          onSubmit={handleCreateSlot}
        >
          {({ setFieldValue }: FormikProps<TCreateSlotInitialValues>) => {
            return (
              <Form className="space-y-5">
                <Dropdown
                  name="service"
                  options={servicesToDropdownOption(servicesData.data)}
                  setFieldValue={setFieldValue}
                  placeholder="Select service"
                />
                <Input name="date" label="Date" placeholder="ex: YYYY-MM-DD" />
                <Input
                  name="startTime"
                  label="Start time"
                  placeholder="ex: 10:00"
                />
                <Input
                  name="endTime"
                  label="End time"
                  placeholder="ex: 17:00"
                />
                <button className="form-submit-btn w-full">Create slot</button>
              </Form>
            );
          }}
        </Formik>
      </CustomModal>
    </>
  );
};

export default SlotManagement;
