import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

function AddressForm() {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    landmark: '',
    contactno: '',
  });

  const [objectId, setObjectId] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchObjectId = async () => {
      try {
        if (session?.user?.email) {
          const response = await fetch(`/api/fetch/route?email=${encodeURIComponent(session.user.email)}`);
          if (response.ok) {
            const data = await response.json();
            setObjectId(data._id);
          } else {
            console.error('Failed to fetch object ID');
          }
        }
      } catch (error) {
        console.error('Error fetching object ID:', error);
      }
    };

    if (session?.user) {
      fetchObjectId();
    }
  }, [session?.user]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/post/postaddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          objectId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data sent successfully:', data);
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      {status === 'authenticated' && session?.user && (
        <div>
          <p>Email: {session.user.email}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="landmark">Landmark (Optional):</label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contactno">Contact No:</label>
          <input
            type="text"
            id="contactno"
            name="contactno"
            value={formData.contactno}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddressForm;
