import { signOut, useSession } from "next-auth/react";
import AddressForm from '../form/addresspage'; // Import the AddressForm component
import React from "react";

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

    </div>
  );
};

export default Dashboard;
