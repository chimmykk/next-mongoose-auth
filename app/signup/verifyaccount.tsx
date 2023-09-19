import React, { useState } from 'react';

interface VerifyAccountProps {
  email: string;
}

function VerifyAccount({ email }: VerifyAccountProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null); // Initialize status as null

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleConfirmCodeClick = () => {
    const code = parseInt(verificationCode, 10);
    if (!isNaN(code)) {
      const requestBody = {
        email: email,
        verification_code: verificationCode,
      };

      fetch('/api/verifyemail/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (response.ok) {
            setVerificationStatus('Email verified successfully'); 
            return response.json();
          } else {
            setVerificationStatus('Failed to verify email');
            throw new Error('Failed to verify email');
          }
        })
        .catch((error) => {
          console.error('Email verification error:', error);
        });
    } else {
      setVerificationStatus('Invalid verification code. Please enter a valid integer'); 
    }
  };

  return (
    <div>
      <h2>Verify Account</h2>
      <p>Email: {email}</p>
      <label>
        Enter Verification Code:
        <input
          type="text"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
        />
      </label>
      <button onClick={handleConfirmCodeClick}>Confirm Code</button>
      
      {/* Render the verification status */}
      {verificationStatus && <p>{verificationStatus}</p>}
    </div>
  );
}

export default VerifyAccount;
