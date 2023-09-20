import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ProfileBanner = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const { data: session } = useSession(); // Destructure `data` property from `useSession` hook

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const email = session?.user?.email;

        if (!email) {
          console.error('User email not found.');
          return;
        }

        const response = await fetch(`/api/upload/banner?email=${encodeURIComponent(email)}`);

        if (response.ok) {
          const data = await response.json();
          setBannerImage(data.bannerImage);
        } else {
          console.error('Failed to fetch banner image:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching banner image:', error);
      }
    };

    fetchBannerImage();
  }, [session?.user?.email]);

  return (
    <div className="bg-white border rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold">Profile Banner</h3>
      <div className="mt-2 flex items-center">
        <div className="w-64 h-28 bg-gray-400 rounded-lg mr-4">
          {bannerImage ? (
            <img
              src={`data:image/jpeg;base64,${bannerImage}`}
              alt="Profile Banner"
              className="w-full h-full rounded-lg"
            />
          ) : (
            <span>No banner image available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
