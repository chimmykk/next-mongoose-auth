import { signOut, useSession } from "next-auth/react";
import AddressForm from '../form/addresspage'; // Import the AddressForm component
import React from "react";
import Settings from "../settings/page";
import ProfilePicture from "../displayform/page";
import ProfileBanner from "../profilebanner/page";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div>
      <button className="text-red-500" onClick={() => signOut()}>Signout</button>
      <h1>Dashboard</h1>
      <h2>Successfully Logged In!</h2>
      <h1>hi {session?.user?.email}</h1>
      <div>
        name: <span className="font-bold">{session?.user?.name}</span>
      </div>

      {/* Render the AddressForm component here */}

      <AddressForm />
<ProfilePicture></ProfilePicture>
<Settings></Settings>
<ProfileBanner></ProfileBanner>

    </div>
  );
};

export default Dashboard;
