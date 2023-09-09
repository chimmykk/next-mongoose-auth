import { signOut } from "next-auth/react";

const Dashboard = () => {
  return (
    <div>
        <button className="text-red-500" onClick={() => signOut()}>Signout</button>
      <h1>Dashboard</h1>
    <h2>Successfully Logged In!</h2>
    </div>
  );
};

export default Dashboard;