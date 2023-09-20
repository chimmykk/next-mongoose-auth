import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ProfilePicture = () => {
  const [profileImage, setProfileImage] = useState(null);
  const { data: session } = useSession(); // Destructure `data` property from `useSession` hook

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const email = session?.user?.email;

        if (!email) {
          console.error('User email not found.');
          return;
        }

        const response = await fetch(`/api/upload/image?email=${encodeURIComponent(email)}`);

        if (response.ok) {
          const data = await response.json();
          setProfileImage(data.profileImage);
        } else {
          console.error('Failed to fetch profile image:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, [session?.user?.email]);

  return (
    <div className="bg-white border rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold">Profile Picture</h3>
      <div className="mt-2 flex items-center">
        <div className="w-28 h-28 bg-gray-400 rounded-full mr-4">
          {profileImage ? (
            <img
              src={`data:image/jpeg;base64,${profileImage}`}
              alt="Profile Picture"
              className="w-full h-full rounded-full"
            />
          ) : (
            <span>No profile picture available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;