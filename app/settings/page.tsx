"use client"

import { useState } from 'react';
import PaymentInformation from './paymentInfo';
import ProfileSetting from './profileSetting';
import ShippingInfo from './shippingInfo';


const Settings = () => {
  const [activeItem, setActiveItem] = useState('Profile');

  // Define a state to track the visibility of the address form

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className="py-6 p-8 bg-bgGray">
      <h1 className="text-4xl font-bold">Settings</h1>
      <div className="flex border-b pb-2 text-lg border-gray-300 mt-4">
        <div
          className={`cursor-pointer mr-4 ${
            activeItem === 'Profile' ? 'text-green-500 ' : 'text-gray-600'
          }`}
          onClick={() => handleClick('Profile')}
        >
          Profile
        </div>
        <div
          className={`cursor-pointer mr-4 ${
            activeItem === 'Shipping Information' ? 'text-green-500 ' : 'text-gray-600'
          }`}
          onClick={() => handleClick('Shipping Information')}
        >
          Shipping Information
        </div>
        <div
          className={`cursor-pointer ${
            activeItem === 'Payment Information' ? 'text-green-500 ' : 'text-gray-600'
          }`}
          onClick={() => handleClick('Payment Information')}
        >
          Payment Information
        </div>
      </div>
          {/* Profile */}
      {activeItem === 'Profile' && (
        <ProfileSetting />
      )}

      {/* Shipping information */}
      {activeItem === 'Shipping Information' && (
        <ShippingInfo />
      )}

    {activeItem === 'Payment Information' && (
      <PaymentInformation />
)}

    </div>
  );
};

export default Settings;
