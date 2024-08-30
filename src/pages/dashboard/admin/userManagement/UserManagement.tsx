import Dropdown from "@/components/formik/Dropdown";
import CustomModal from "@/components/reUsable/CustomModal";
import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user";
import { TErrorResponse, TUserResponse } from "@/types";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { toast } from "sonner";

const userRoleOptions = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

type TInitialValues = {
  role: string;
};

const UserManagement = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  // modal
  const [isUserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<TUserResponse | null>(null);

  const initialValues: TInitialValues = {
    role: userInfo?.role || "",
  };

  const handleUserUpdate = async (values: TInitialValues) => {
    setUserUpdateModalOpen(false);
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
          title="User Management"
          subTitle="Overview and manage user roles"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((user: TUserResponse) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setUserInfo(user);
                          setUserUpdateModalOpen(true);
                        }}
                        className="text-white bg-primary-foreground py-1 px-4 rounded-md font-medium"
                      >
                        Edit
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
        isOpen={isUserUpdateModalOpen}
        setIsOpen={setUserUpdateModalOpen}
      >
        <Formik initialValues={initialValues} onSubmit={handleUserUpdate}>
          {({ setFieldValue }: FormikProps<TInitialValues>) => {
            return (
              <Form className="space-y-5">
                <Dropdown
                  name="role"
                  options={userRoleOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Select role"
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

export default UserManagement;
