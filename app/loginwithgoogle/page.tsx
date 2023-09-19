"use client"
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginWithGoogle() {
  useEffect(() => {

    signIn('google');
  }, []);

  return (
    <div>
      <p>Redirecting to Google login...</p>
    </div>
  );
}
