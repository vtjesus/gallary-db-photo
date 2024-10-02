import React from "react";
import { Customer } from "../types/Customer";
import PhotoGrid from "./PhotoGrid";

interface CustomerDetailsProps {
  customer: Customer | null;
  photos: string[];
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  photos,
}) => {
  if (!customer) {
    return (
      <div className="flex items-center justify-center text-base text-gray-400">
        Select a customer to see details
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="text-2xl text-gray-700 font-semibold mb-3">
        {customer.title} {customer.name}
      </h2>
      <p className="text-base text-gray-400 mb-4">{customer.address}</p>
      <div className="my-4">
        <PhotoGrid photos={photos} />
      </div>
    </div>
  );
};

export default CustomerDetails;
