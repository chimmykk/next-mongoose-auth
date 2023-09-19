"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const SellerRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const [returnAddress, setReturnAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    country: '',
  });

  const [identityInfo, setIdentityInfo] = useState({
    identityVerification: "",
    identityVerificationId: "",
    // Add fields for identity verification (e.g., Aadhar or others)
  });

  // Define your categories and subcategories
  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    // Add more categories here
  ];

const subcategories: { [key: string]: string[] } = {
  Electronics: ['Smartphones', 'Laptops', 'Accessories'],
  Clothing: ['Men', 'Women', 'Kids'],
  'Home & Garden': ['Furniture', 'Appliances', 'Decor'],
};


  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    // Reset the subcategory selection when the category changes
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubcategory = e.target.value;
    setSelectedSubcategory(selectedSubcategory);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const [objectId, setObjectId] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchObjectId = async () => {
      try {
        if (session?.user?.email) {
          const route1 = `/api/fetch/route?email=${encodeURIComponent(session.user.email)}`;
        
          const response = await fetch(route1);
      
          if (response.ok) {
            const data = await response.json();
            setObjectId(data._id);
          } else {
            console.error('Failed to fetch object ID');
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    if (session?.user) {
      fetchObjectId();
    }
  }, [session?.user]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const formData = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      returnAddress: { ...returnAddress },
      identityInfo: { ...identityInfo },
    };

    // Send the data to the server
    fetch('http://localhost:3000/api/flow/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        objectId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };



  return (
    <div className="container flex flex-col sm:flex-row justify-center px-5 sm:px-6 lg:px-12 items-stretch mx-auto mt-8">
        <div className="flex-shrink-0 sm:w-2/5 bg-green-200 p-6 h-full">
            <h2 className="text-3xl font-semibold mb-4">Seller Registration - Step {currentStep}</h2>
        </div>
        <div className='flex-shrink-0 sm:w-3/5 bg-white p-6 h-full'>
            <form onSubmit={handleSubmit} className=" w-full">
                    {currentStep === 1 && (
                    <div className="flex flex-col items-center">
                        {/* Step 1: Category and Subcategory Selection */}
                        {/* Category Dropdown */}
                        <div className="mb-8 w-full">
                        <label htmlFor="category" className="block text-gray-600 text-sm font-medium mb-2">
                            Select Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            required
                        >
                            <option value="" disabled>
                            Select a category
                            </option>
                            {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                            ))}
                        </select>
                        </div>

                        {/* Subcategory Dropdown */}
                        {selectedCategory && (
                        <div className="mb-8 w-full">
                            <label htmlFor="subcategory" className="block text-gray-600 text-sm font-medium mb-2">
                            Select Subcategory
                            </label>
                            <select
                            id="subcategory"
                            name="subcategory"
                            value={selectedSubcategory}
                            onChange={handleSubcategoryChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            required
                            >
                            <option value="" disabled>
                                Select a subcategory
                            </option>
                            {subcategories[selectedCategory].map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                {subcategory}
                                </option>
                            ))}
                            </select>
                        </div>
                        )}

                        {/* Next Button */}
                        <div className="text-center">
                        <button
                            type="button"
                            onClick={handleNextStep}
                            className="bg-bgGreen text-white font-semibold py-2 px-4 rounded-full"
                        >
                            Next
                        </button>
                        </div>
                    </div>
                    )}

                    {currentStep === 2 && (
                    <div>
                        {/* Step 2: Return Address */}
                        <div className="mb-4">
                        <label htmlFor="addressLine1" className="block text-gray-600 text-sm font-medium mb-2">
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            id="addressLine1"
                            name="addressLine1"
                            value={returnAddress.addressLine1}
                            onChange={(e) => setReturnAddress({ ...returnAddress, addressLine1: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            required
                        />
                        </div>

                        <div className="mb-4">
                        <label htmlFor="addressLine2" className="block text-gray-600 text-sm font-medium mb-2">
                            Address Line 2
                        </label>
                        <input
                            type="text"
                            id="addressLine2"
                            name="addressLine2"
                            value={returnAddress.addressLine2}
                            onChange={(e) => setReturnAddress({ ...returnAddress, addressLine2: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        </div>

                        <div className="mb-4">
                        <label htmlFor="state" className="block text-gray-600 text-sm font-medium mb-2">
                            State
                        </label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={returnAddress.state}
                            onChange={(e) => setReturnAddress({ ...returnAddress, state: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            required
                        />
                        </div>

                        <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-600 text-sm font-medium mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={returnAddress.city}
                            onChange={(e) => setReturnAddress({ ...returnAddress, city: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            required
                        />
                        </div>

                        <div className="mb-4">
                        <label htmlFor="country" className="block text-gray-600 text-sm font-medium mb-2">
                            Country
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={returnAddress.country}
                            onChange={(e) => setReturnAddress({ ...returnAddress, country: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            required
                        />
                        </div>

                        {/* Next and Previous Buttons */}
                        <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handlePrevStep}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-full"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={handleNextStep}
                            className="bg-bgGreen text-white font-semibold py-2 px-4 rounded-full"
                        >
                            Next
                        </button>
                        </div>
                    </div>
                    )}


                {currentStep === 3 && (
                <div>
                    {/* Step 3: Identity Verification */}
                    <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Select Identity Verification</label>
                    <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                        <input
                            type="radio"
                            id="panVerification"
                            name="identityVerification"
                            value="pan"
                            checked={identityInfo.identityVerification === "pan"}
                            onChange={(e) => setIdentityInfo({ ...identityInfo, identityVerification: e.target.value })}
                        />
                        <span className="ml-2">PAN</span>
                        </label>
                        <label className="inline-flex items-center">
                        <input
                            type="radio"
                            id="aadharVerification"
                            name="identityVerification"
                            value="aadhar"
                            checked={identityInfo.identityVerification === "aadhar"}
                            onChange={(e) => setIdentityInfo({ ...identityInfo, identityVerification: e.target.value })}
                        />
                        <span className="ml-2">Aadhar</span>
                        </label>
                    </div>
                    </div>

                    {/* Identity Verification ID Field */}
                    <div className="mb-4">
                    <label htmlFor="identityVerificationId" className="block text-gray-600 text-sm font-medium mb-2">
                        {identityInfo.identityVerification === "pan" ? "PAN Number" : "Aadhar Number"}
                    </label>
                    <input
                        type="text"
                        id="identityVerificationId"
                        name="identityVerificationId"
                        value={identityInfo.identityVerificationId}
                        onChange={(e) => setIdentityInfo({ ...identityInfo, identityVerificationId: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                    />
                    </div>

                    {/* Next and Previous Buttons */}
                    <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handlePrevStep}
                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-full"
                    >
                        Previous
                    </button>
                    <button
                        type="submit"
                        className="bg-bgGreen text-white font-semibold py-2 px-4 rounded-full"
                    >
                        Submit
                    </button>
                    </div>
                </div>
                )}

                </form>
        </div>
    </div>
  );
};

export default SellerRegistration;