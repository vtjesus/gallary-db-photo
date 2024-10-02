import React from "react";
import { Customer } from "../types/Customer";

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId: number | null;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onSelectCustomer,
  selectedCustomerId,
}) => {
  return (
    <ul className="max-h-[135vh] overflow-y-auto">
      {customers.map((customer) => (
        <li
          key={customer.id}
          onClick={() => onSelectCustomer(customer)}
          className={`cursor-pointer p-4 hover:bg-[#eeeeee] hover:shadow-md transition-all duration-300 border-b border-gray-100 ${
            customer.id === selectedCustomerId
              ? "bg-[#eeeeee] shadow-md"
              : "bg-white shadow-sm"
          }`}
        >
          <h2 className="font-semibold text-gray-700">
            {customer.title} {customer.name}
          </h2>
        </li>
      ))}
    </ul>
  );
};

export default CustomerList;
