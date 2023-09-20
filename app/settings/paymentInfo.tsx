
import React, { useState } from 'react';

const PaymentInformation = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<string[]>([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCVV, setNewCVV] = useState('');
  const [newExpirationDate, setNewExpirationDate] = useState('');

  // Define the payment input fields and their labels based on the selected payment method
const paymentFields: Record<string, { label: string; placeholder: string }[]> = {
  upi: [
    { label: 'UPI Address:', placeholder: 'Enter UPI address' },
  ],
  'credit-card': [
    { label: 'Card Number:', placeholder: 'Enter card number' },
    { label: 'CVV:', placeholder: 'Enter CVV' },
    { label: 'Expiration Date:', placeholder: 'MM/YYYY' },
  ],
};


const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedPaymentMethod(event.target.value);
};


  const handleNewPaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardNumber(event.target.value);
  };

  const handleCVVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCVV(event.target.value);
  };

  const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpirationDate(event.target.value);
  };

  const handleDeletePaymentMethod = (index:number) => {
    const updatedPaymentMethods = [...savedPaymentMethods];
    updatedPaymentMethods.splice(index, 1);
    setSavedPaymentMethods(updatedPaymentMethods);
  };

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission here
  // Update savedPaymentMethods with the new payment method

  let newPaymentMethodDetails = '';
  if (selectedPaymentMethod === 'upi') {
    newPaymentMethodDetails = `UPI: ${newPaymentMethod}`;
  } else if (selectedPaymentMethod === 'credit-card') {
    // Mask all but the last four digits of the card number
    const maskedCardNumber = `**** **** **** ${newCardNumber.slice(-4)}`;
    newPaymentMethodDetails = `Card: ${maskedCardNumber}`;
  }
  setSavedPaymentMethods([...savedPaymentMethods, newPaymentMethodDetails]);
  setNewPaymentMethod('');
  setNewCardNumber('');
  setNewCVV('');
  setNewExpirationDate('');
};

  return (
    <div className='sm:w-[70%]'>
      <h2 className="text-2xl font-semibold mt-4">
        This is where you can manage your payment methods
      </h2>
      {/* Display saved payment methods */}
      <div className="mt-4 bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Saved Payment Methods:</h3>
        <ul>
          {savedPaymentMethods.map((method, index) => (
            <li key={index} className="flex items-center justify-between">
              {method}
              <button
                className="text-red-500"
                onClick={() => handleDeletePaymentMethod(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Button to add more payment methods */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setShowPaymentForm(true)}
      >
        Add More Payment Methods
      </button>

      {/* Payment input form for adding new payment methods */}
      {showPaymentForm && (
        <form className="mt-4" onSubmit={handleSubmit}>
          {/* Payment method selection */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Payment Method:
            </label>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="upi">UPI</option>
              <option value="credit-card">Credit/Debit Card</option>
              {/* You can add more payment method options here */}
            </select>
          </div>

          {/* Payment input fields */}
          {paymentFields[selectedPaymentMethod].map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field.label}
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                placeholder={field.placeholder}
                value={
                  field.label === 'Card Number:'
                    ? newCardNumber
                    : field.label === 'CVV:'
                    ? newCVV
                    : field.label === 'Expiration Date:'
                    ? newExpirationDate
                    : newPaymentMethod
                }
                onChange={
                  field.label === 'Card Number:'
                    ? handleCardNumberChange
                    : field.label === 'CVV:'
                    ? handleCVVChange
                    : field.label === 'Expiration Date:'
                    ? handleExpirationDateChange
                    : handleNewPaymentMethodChange
                }
              />
            </div>
          ))}

          {/* Submit button to add the new payment method */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Payment Method
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentInformation;
