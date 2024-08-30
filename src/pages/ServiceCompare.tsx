import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the import based on your project structure
import {
  clearComparisonList,
  removeServiceFromCompare,
} from "@/redux/features/service/serviceComparisonSlice";
import { TService } from "@/types";
import SectionTitle from "@/components/reUsable/SectionTitle";
import { toast } from "sonner";

const ServiceCompare: React.FC = () => {
  const dispatch = useDispatch();
  const selectedServices = useSelector(
    (state: RootState) => state.serviceComparison.selectedServices
  );

  const handleRemoveService = (serviceId: string) => {
    toast.success("Service removed");
    dispatch(removeServiceFromCompare(serviceId));
  };

  const handleClearComparison = () => {
    toast.success("All services removed");
    dispatch(clearComparisonList());
  };

  return (
    <div className="container">
      <SectionTitle
        title="Service Comparison"
        subTitle="Compare Services Side by Side"
      />
      {selectedServices.length === 0 && (
        <p className="py-20 text-center text-xl font-semibold">
          No services selected for comparison.
        </p>
      )}
      {selectedServices.length > 0 && (
        <>
          <div className="flex justify-end">
            <button onClick={handleClearComparison} className="form-submit-btn">
              Clear Comparison
            </button>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-5">
            {selectedServices.map((service: TService) => (
              <div
                key={service._id}
                className="border rounded-md bg-primary-foreground/5 p-4"
              >
                <h3 className="text-xl font-bold">{service.name}</h3>
                <p>{service.description}</p>
                <p>Price: ${service.price}</p>
                <p>Duration: {service.duration} mins</p>
                <button
                  onClick={() => handleRemoveService(service._id)}
                  className="primary-border-btn font-medium mt-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceCompare;
