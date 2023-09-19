"use client"
import React, { useState } from 'react';
import PasswordChangeForm from './resetpage';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState<boolean>(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      const response = await fetch('/api/resetpassword/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        setShowPasswordChangeForm(true);
      } else {
        const data = await response.json();
        setError(data.message);
        setSuccess(false);
      }
    } catch (error) {
      console.error('An error occurred while resetting the password:', error);
      setError('An error occurred while resetting the password.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Password reset instructions sent to your email.</p>}
      {showPasswordChangeForm && <PasswordChangeForm email={email} />}
    </div>
  );
}
