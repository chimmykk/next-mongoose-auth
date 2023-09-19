"use client"
import React, { useState } from 'react';
import VerifyAccount from '../signup/verifyaccount';

export default function SignupPage() {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are necessary.');
      return;
    }

    try {
      const response = await fetch('/api/register/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.message === 'User registered successfully.') {
          const verificationEmailResponse = await fetch('/api/send/route', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, verification_token: data.verification_token, verification_code: data.verification_code }),
          });

          if (verificationEmailResponse.ok) {
            setRegistrationSuccess(true);
          } else {
            alert('User registered successfully, but failed to send verification email.');
          }
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
      {!registrationSuccess ? (
        <>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
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
        </>
      ) : (
        <VerifyAccount email={email} /> // Pass the email as a prop
      )}
    </div>
  );
}
