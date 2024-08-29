import SectionTitle from "@/components/reUsable/SectionTitle";
import { useGetServicesQuery } from "@/redux/features/service";

const ServiceManagement = () => {
  const { data } = useGetServicesQuery(undefined);
  console.log(data);

  return (
    <div className="">
      <SectionTitle
        title="Service Management"
        subTitle="Manage your services efficiently and keep track of all service details"
      />
      <div className="flex justify-end mb-5">
        <button className="form-submit-btn">Add Service</button>
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
            {data?.data.map((service) => (
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
                    <button variant="outline" size="sm">
                      Edit
                    </button>
                    <button variant="destructive" size="sm">
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
  );
};

export default ServiceManagement;
