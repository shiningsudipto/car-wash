import FormikForm from "@/components/formik/FormikForm";
import Input from "@/components/formik/Input";
import CustomModal from "@/components/reUsable/CustomModal";
import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import {
  useGetUserInfoQuery,
  useUpdateUserMutation,
} from "@/redux/features/user";
import { TErrorResponse } from "@/types";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";

type TEditUserInitialValues = {
  name: string;
  phone: string;
  address: string;
};

const Profile = () => {
  const { data, isLoading, error } = useGetUserInfoQuery(undefined);
  console.log("user", data, error);
  const userInfo = data?.data;
  const [updateUser] = useUpdateUserMutation();
  // modal
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);

  const userProfileInitialValues: TEditUserInitialValues = {
    name: userInfo?.name,
    phone: userInfo?.phone,
    address: userInfo?.address,
  };

  const onSubmit = async (values: TEditUserInitialValues) => {
    setEditUserModalOpen(false);
    const toastId = toast.loading("User updating");
    if (userInfo) {
      try {
        const response = await updateUser({
          userData: values,
          id: userInfo._id,
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="">
        <SectionTitle
          title="Profile"
          subTitle="Overview and manage your information"
        />
        <div className="flex justify-center w-full">
          <div className="mt-6 relative grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-[50%] lg:p-10 p-5 bg-primary-foreground/5 rounded-md w-full">
            <button
              onClick={() => setEditUserModalOpen(true)}
              className="absolute top-1 right-2 flex items-center gap-x-2"
            >
              <FaEdit /> Edit profile
            </button>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Name</h2>
              <p className="text-gray-500">{userInfo?.name}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Email</h2>
              <p className="text-gray-500">{userInfo?.email}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
              <p className="text-gray-500">{userInfo?.phone}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Role</h2>
              <p
                className={`text-gray-500 ${
                  userInfo?.role === "admin"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {userInfo?.role.charAt(0).toUpperCase() +
                  userInfo?.role.slice(1)}
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Address</h2>
              <p className="text-gray-500">{userInfo?.address}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Member Since
              </h2>
              <p className="text-gray-500">
                {new Date(userInfo?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Last Updated
              </h2>
              <p className="text-gray-500">
                {new Date(userInfo?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isEditUserModalOpen}
        setIsOpen={setEditUserModalOpen}
      >
        <FormikForm
          initialValues={userProfileInitialValues}
          onSubmit={onSubmit}
        >
          <Input name="name" label="Name" />
          <Input name="phone" label="Phone" />
          <Input name="address" label="Address" />
          <button type="submit" className="form-submit-btn w-full">
            Submit
          </button>
        </FormikForm>
      </CustomModal>
    </>
  );
};

export default Profile;
