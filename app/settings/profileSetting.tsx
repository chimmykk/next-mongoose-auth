
import Image from 'next/image';
import { useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs'; // Import the delete icon
import { useSession } from 'next-auth/react';

export default function ProfileSetting(){
  const {data: session} = useSession()

   const [profileImage, setProfileImage] = useState(session?.user?.image); // Default profile image
  const [profileBanner, setProfileBanner] = useState(
    ''
  ); // Default profile banner

    // Define state variables for each setting
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [bio, setBio] = useState('This is my bio.');
  // Define state variables to track editing mode
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);


  // Function to handle saving changes
  const handleSaveChanges = () => {
    // Perform any necessary actions to save changes, e.g., update API
    // You can add validation logic here if needed
    // For simplicity, we'll just exit editing mode
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingBio(false);
  };

   // Function to handle profile picture update
   const handleProfilePictureUpdate = async (event:any) => {
    const file = event.target.files?.[0];
  
    if (file) {
      try {
        const email = session?.user?.email;
  
        if (!email) {
          console.error('User email not found.');
          return;
        }
  
        // Call the API to fetch the objectId using the session email
        const response = await fetch(`/api/fetch/route?email=${encodeURIComponent(email)}`);
  
        if (!response.ok) {
          console.error('Failed to fetch object ID');
          return;
        }
  
        const objectId = await response.json();
  
        // Read the file using FileReader
        const reader = new FileReader();
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
           // Instead of uploading url, convert the image to base64 encoding
            const base64String = reader.result.split(',')[1];
  
     // Send a POST request to the API endpoint with the Base64 image data
            const uploadResponse = await fetch('/api/upload/image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ objectId, imageData: base64String }), // Send ObjectId and Base64 
            });
  
  
            if (uploadResponse.ok) {
              const uploadedImageUrl = await uploadResponse.json();

              setProfileImage(uploadedImageUrl);
  
  // test post request
              console.log('Image uploaded successfully!');
            } else {
        
              console.log('Error uploading image:', uploadResponse.statusText);
            }
          } else {
            console.error('Error reading file as string.');
          }
        };
  
        // Read the file as data URL to trigger the onload function
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
    // Function to delete the profile picture
  const handleProfilePictureDelete = () => {
    setProfileImage(''); // Set the default profile image
  };

   // Function to handle profile banner update
   const handleProfileBannerUpdate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      try {
        const email = session?.user?.email;
  
        if (!email) {
          console.error('User email not found.');
          return;
        }
  
        // Call the API to fetch the objectId using the session email
        const response = await fetch(`/api/fetch/route?email=${encodeURIComponent(email)}`);
  
        if (!response.ok) {
          console.error('Failed to fetch object ID');
          return;
        }
  
        const objectId = await response.json();
  
        // Read the file using FileReader
        const reader = new FileReader();
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
            // Instead of uploading URL, convert the image to base64 encoding
            const base64String = reader.result.split(',')[1];
  
            // Send a POST request to the API endpoint to update banner image
            const uploadResponse = await fetch('/api/upload/banner', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ objectId, bannerImageData: base64String }), // Send ObjectId and Base64
            });
  
            if (uploadResponse.ok) {
              const uploadedBannerImageUrl = await uploadResponse.json();
  
              // Update the banner image
              setProfileBanner(uploadedBannerImageUrl);
  // set
            
              console.log('Response from the API:', uploadedBannerImageUrl);
  
              console.log('Banner image uploaded successfully!');
            } else {
              console.log('Error uploading banner image:', uploadResponse.statusText);
            }
          } else {
            console.error('Error reading file as string.');
          }
        };
  
        // Read the file as data URL to trigger the onload function
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading banner image:', error);
      }
    }
  };
  
  
  
  
  
  setProfileBanner
  
  // Function to delete the profile banner
  const handleProfileBannerDelete = () => {
    setProfileBanner(''); // Set the default profile banner
  };

    return(
        <div className='sm:w-[70%] p-4'>

          {/* Profile Picture Section */}
          
          <div className="bg-white border rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold">Profile Picture</h3>
              <div className="mt-2 flex items-center">
                <div className="w-28 h-28 bg-gray-400 rounded-full mr-4">
                  {/*  profile picture here */}
                {profileImage && 
                  <Image
                    src={profileImage} // Replace with the actual path to the profile picture
                    width={1000}
                    height={1000}
                    alt="Profile Picture"
                    className="w-full h-full rounded-full"
                  />
                }
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-4 items-center">
                    <label
                      htmlFor="profilePictureInput"
                      className="bg-bgGreen text-white px-2 py-1 rounded mr-2 cursor-pointer"
                    >
                      Update Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePictureInput"
                      accept="image/jpeg, image/png, image/gif"
                      style={{ display: 'none' }}
                      onChange={handleProfilePictureUpdate}
                    />
                    <button onClick={handleProfilePictureDelete} className="text-red-500">
                      <BsTrash />
                    </button>
                  </div>
                  <p className="text-gray-500 mt-2">
                    Must be JPEG, PNG, or GIF and cannot exceed 10MB.
                  </p>
                </div>
              </div>
          </div>

          {/* Profile Banner Section */}
          <div className="bg-white border rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold">Profile Banner</h3>
                  <div className="mt-2 flex items-center">
                <div className="w-64 h-28 bg-gray-400 rounded-lg mr-4">
                  {/* profile banner here */}
                  <Image
                  width={1000}
                  height={1000}
                    src={profileBanner} // Replace with the actual path to the profile picture
                    alt="Profile Picture"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col">
          <div className="flex gap-4 items-center">
            <label
              htmlFor="profileBannerInput"
              className="bg-bgGreen text-white px-2 py-1 rounded mr-2 cursor-pointer"
            >
              Update
            </label>
            <input
              type="file"
              id="profileBannerInput"
              accept="image/jpeg, image/png, image/gif"
              style={{ display: 'none' }}
              onChange={handleProfileBannerUpdate}
            />
            <button
              className="text-red-500"
              onClick={handleProfileBannerDelete}
            >
              <BsTrash />
            </button>
          </div>
          <p className="text-gray-500 mt-2">
            File format: JPEG, PNG, GIF (recommended 1200x480, max 10MB)
          </p>
        </div>
              </div>
          </div>

          {/* Profile Settings Section */}
          <div className="bg-white border rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold">Profile Settings</h3>
      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="font-bold w-16">Name</p>
            {isEditingName ? (
              <input
                type="text"
                className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <div className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow">
                {name}
              </div>
            )}
            {isEditingName ? (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingName(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingName(true)}
              >
                <BsPencil />
              </button>
            )}
          </div>
          <div className="flex items-center">
            <p className="font-bold w-16">Email</p>
            {isEditingEmail ? (
              <input
                type="email"
                className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow">
                {email}
              </div>
            )}
            {isEditingEmail ? (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingEmail(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingEmail(true)}
              >
                <BsPencil />
              </button>
            )}
          </div>
          <div className="flex items-center">
            <p className="font-bold w-16">Bio</p>
            {isEditingBio ? (
              <textarea
                className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <div className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow">
                {bio}
              </div>
            )}
            {isEditingBio ? (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingBio(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingBio(true)}
              >
                <BsPencil />
              </button>
            )}
          </div>
          <button
            className="bg-red-500 w-fit text-white self-start px-2 py-1 rounded mr-4"
            // onClick={}
          >
            Reset Password
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-bgGreen text-white px-2 py-1 rounded"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
        </div>
    )
}