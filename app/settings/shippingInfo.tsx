
import { BsTrash } from 'react-icons/bs'; // Import the delete icon
import { useState } from 'react';

export default function ShippingInfo(){

 const [savedAddresses, setSavedAddresses] = useState([
    '123 Main St, Downtown, New York, NY - 12345, United States',
  ]);

  const [newAddress, setNewAddress] = useState({
    fullName: '',
    addressLine1: '',
    street: '',
    country: '',
    pinCode: '',
    city: '',
    state: '',
  });

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  const toggleAddressForm = () => {
    setIsAddingAddress(!isAddingAddress);
  };

  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = [...savedAddresses];
    updatedAddresses.splice(index, 1);
    setSavedAddresses(updatedAddresses);
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAddress = `${newAddress.addressLine1}, ${newAddress.street}, ${newAddress.city}, ${newAddress.state} - ${newAddress.pinCode}, ${newAddress.country}`;
    setSavedAddresses([...savedAddresses, formattedAddress]);
    setIsAddingAddress(false);
    setNewAddress({
      fullName: '',
      addressLine1: '',
      street: '',
      country: '',
      pinCode: '',
      city: '',
      state: '',
    });
  };

   const handleUseAddress = (index: number) => {
    setSelectedAddress(savedAddresses[index]);
  };
    return(
        <div className='sm:w-[70%] p-4 min-h-screen '>
          <h2 className="text-2xl font-semibold mt-4">This is where your order will be delivered.</h2>

            {/* Display Saved Addresses */}
      {savedAddresses.map((address, index) => (
        <div className="flex items-center mt-4" key={index}>
          <div className="border border-gray-300 p-2 rounded-lg bg-white font-normal flex-grow">
            {address}
          </div>
          <button
            className={`ml-2 ${
              selectedAddress === address ? 'text-bgGreen' : 'text-blue-500'
            }`}
            onClick={() => handleUseAddress(index)}
          >
            {selectedAddress === address ? 'Current Address' : 'Use This Address'}
          </button>
          <button
            className="ml-2 text-red-500"
            onClick={() => handleDeleteAddress(index)}
          >
            <BsTrash />
          </button>
        </div>
      ))}

          {/* Button to Add New Address */}
          <button onClick={toggleAddressForm} className="bg-bgGreen text-white p-2 rounded mt-4">
            Add New Address
          </button>

              {/* Address Input Form */}
      {isAddingAddress && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Enter your New Address</h3>
          <form onSubmit={handleSaveNewAddress}>
            <div className="flex flex-wrap -mx-2">
              {/* Input field for Full Name */}
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  placeholder="John Doe"
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                />
              </div>

              {/* Input field for Address Line 1 */}
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address Line 1:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  placeholder="123 Main St"
                  value={newAddress.addressLine1}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                />
              </div>

              {/* Input field for Locality */}
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Street:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  placeholder="Downtown"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                />
              </div>

              {/* Input field for Country */}
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  placeholder="United States"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                />
              </div>

              {/* Input field for Pin Code */}
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Pin Code:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  placeholder="12345"
                  value={newAddress.pinCode}
                  onChange={(e) => setNewAddress({ ...newAddress, pinCode: e.target.value })}
                />
              </div>

              {/* Input field for City */}
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  placeholder="New York"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
              </div>

              {/* Input field for State */}
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  State:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  placeholder="NY"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Address
            </button>
          </form>
        </div>
      )}
        </div>
    )
}