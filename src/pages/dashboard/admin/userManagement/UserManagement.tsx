import CustomModal from "@/components/reUsable/CustomModal";
import Loader from "@/components/shared/Loader";
import { useGetAllUsersQuery } from "@/redux/features/user";
import { useState } from "react";

type TInitialValues = {
  role: string;
};

const UserManagement = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  // modal
  const [isUserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const initialValues: TInitialValues = {
    role: userInfo.role,
  };

  const handleUserUpdate = async (values: TInitialValues) => {
    console.log(values);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="">
        <h1 className="text-xl font-bold mb-4">User Management</h1>
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
              {data?.data.map((user) => (
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
                          // Add your edit logic here
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
        <div></div>
      </CustomModal>
    </>
  );
};

export default UserManagement;
