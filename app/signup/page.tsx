"use client"

import { useState } from 'react';


export default function SignupPage() {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      setError('All fields are necessary.');
      return;
    }

    // To Check if email or username already exists
    const userExistsResponse = await fetch('/api/userExists/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username }),
    });

    const userExistsData = await userExistsResponse.json();

    if (userExistsData.user) {
      setError('Email or username already exists.');
      return;
    }

    try {
      const response = await fetch('/api/register/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.message === 'User registered successfully.') {
          alert('User registered successfully.');
          // You can also navigate the user to another page or perform other actions here.
        } else {
          alert('Registration failed: ' + data.message);
        }
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred while registering the user:', error);
      alert('An error occurred while registering the user.');
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      {error && <p>{error}</p>}
    </div>
  );
}
