import React, { useState, useEffect } from 'react';
import { connectMongoDB } from '../../lib/mongodb';
import Seller from '../../models/seller';
import { useSession } from 'next-auth/react';

interface Address {
  addressLine1?: string;
  addressLine2?: string;
  state?: string;
  city?: string;
  country?: string;
}

const AddressDisplay: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [objectId, setObjectId] = useState<string | null>(null);
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        await connectMongoDB();

        if (session && session.user && session.user.email) {
          const seller = await Seller.findOne({ email: session.user.email });
          if (seller) {
            const { returnAddress } = seller;
            if (returnAddress) {
              setAddresses([returnAddress]);
            } else {
              console.error('No return address found for the seller');
            }
          } else {
            console.error('Seller not found');
          }
        } else {
          console.error('User session or email not available');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

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

    fetchAddresses();
    fetchObjectId();
  }, [session]);

  const fetchSellerInfo = async () => {
    if (objectId) {
      try {
        const response = await fetch(`/api/seller?objectId=${encodeURIComponent(objectId)}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Seller information:', data);
        } else {
          console.error('Failed to fetch seller information');
        }
      } catch (error) {
        console.error('Failed to fetch seller information:', error);
      }
    }
  };

  useEffect(() => {
    fetchSellerInfo();
  }, [objectId]);

  if (sessionStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Addresses:</h2>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>
            <strong>Address Line 1:</strong> {address.addressLine1 || 'N/A'}<br />
            <strong>Address Line 2:</strong> {address.addressLine2 || 'N/A'}<br />
            <strong>State:</strong> {address.state || 'N/A'}<br />
            <strong>City:</strong> {address.city || 'N/A'}<br />
            <strong>Country:</strong> {address.country || 'N/A'}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressDisplay;
