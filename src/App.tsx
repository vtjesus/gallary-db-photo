import { useState, useEffect } from "react";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import { Customer } from "./types/Customer";
import axios from "axios";

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/", {
          params: {
            results: 1000,
            inc: "name,location",
          },
        });

        const fetchedCustomers: Customer[] = response.data.results.map(
          (user: any, index: number) => ({
            id: index + 1,
            name: `${user.name.first} ${user.name.last}`,
            title: user.name.title,
            address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
          })
        );

        setCustomers(fetchedCustomers);
        setSelectedCustomer(fetchedCustomers[0]);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
  }, []);

  const fetchPhotos = async () => {
    try {
      const photoPromises = Array.from({ length: 9 }, async () => {
        const response = await axios.get("https://picsum.photos/200", {
          responseType: "blob",
        });
        // Creating a URL for the fetched image blob
        return URL.createObjectURL(response.data);
      });

      const fetchedPhotos = await Promise.all(photoPromises);
      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos(); // Initial fetch

    const intervalId = setInterval(fetchPhotos, 10000); // Updating photos every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [selectedCustomer]);

  return (
    <>
      <div className="text-center text-2xl font-semibold py-4 text-gray-700 shadow-lg border-b">
        Customer Portal
      </div>
      <div className="flex flex-row">
        <div className="w-1/4 border-r h-full">
          <CustomerList
            customers={customers}
            onSelectCustomer={setSelectedCustomer}
            selectedCustomerId={selectedCustomer?.id ?? null}
          />
        </div>
        <div className="w-3/4 p-6 bg-[#f9f9f9] h-full ">
          <CustomerDetails customer={selectedCustomer} photos={photos} />
        </div>
      </div>
    </>
  );
}

export default App;
