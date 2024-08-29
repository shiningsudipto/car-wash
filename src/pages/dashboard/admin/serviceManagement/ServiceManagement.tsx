import FormikForm from "@/components/formik/FormikForm";
import Input from "@/components/formik/Input";
import CustomModal from "@/components/reUsable/CustomModal";
import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import {
  useCreateServiceMutation,
  useGetServicesQuery,
} from "@/redux/features/service";
import { TErrorResponse, TService } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

type TInitialValues = {
  name: string;
  description: string;
  price: number;
  duration: number;
};

const initialValues: TInitialValues = {
  name: "",
  description: "",
  price: 60,
  duration: 40,
};

const ServiceManagement = () => {
  const { data, isLoading } = useGetServicesQuery(undefined);
  const [isAddServiceModalOpen, setAddServiceModalOpen] = useState(false);
  const [serviceInfo] = useCreateServiceMutation();

  const onSubmit = async (values: TInitialValues) => {
    console.log(values);
    try {
      const res = await serviceInfo(values).unwrap();
      toast(res.message);
    } catch (error) {
      console.log(error);
      const err = error as TErrorResponse;
      toast(err?.data?.errorMessages[0].message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="">
        <SectionTitle
          title="Service Management"
          subTitle="Manage your services efficiently and keep track of all service details"
        />
        <div className="flex justify-end mb-5">
          <button
            onClick={() => setAddServiceModalOpen(true)}
            className="form-submit-btn"
          >
            Add Service
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Duration (mins)
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {}
              {data?.data.map((service: TService) => (
                <tr key={service._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-200">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {service.description}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    ${service.price}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {service.duration} mins
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <button className="text-white bg-primary-foreground py-1 px-4 rounded-md font-medium">
                        Edit
                      </button>
                      <button className="text-white bg-primary py1 px-4 rounded-md font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal
        isOpen={isAddServiceModalOpen}
        setIsOpen={setAddServiceModalOpen}
      >
        <FormikForm initialValues={initialValues} onSubmit={onSubmit}>
          <Input name="name" label="Name" />
          <Input name="description" label="Description" />
          <Input name="price" label="Price" type="number" />
          <Input name="duration" label="Duration" type="number" />
          <button type="submit" className="form-submit-btn w-full">
            Submit
          </button>
        </FormikForm>
      </CustomModal>
    </>
  );
};

export default ServiceManagement;
