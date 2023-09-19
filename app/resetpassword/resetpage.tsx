import React, { useState } from 'react';

interface PasswordChangeFormProps {
  email: string;
}

function PasswordChangeForm({ email }: PasswordChangeFormProps) {
  const [code, setCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/resetpassword/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, newPassword, email }),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
      } else {
        const data = await response.json();
        setError(data.message);
        setSuccess(false);
      }
    } catch (error) {
      console.error('An error occurred while changing the password:', error);
      setError('An error occurred while changing the password.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <p>Email: {email}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Enter the code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">Enter a new password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Password changed successfully.</p>}
    </div>
  );
}

export default PasswordChangeForm;
