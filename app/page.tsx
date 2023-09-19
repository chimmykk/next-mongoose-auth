"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Dashboard from './dashboard/page';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';


export default function Home() {

  const {data:session, status } = useSession();

   useEffect(() => {
    console.log(session);
  }, [session]);

  if (status === "authenticated") {
    return < Dashboard/>
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1>Welcome to the Homepage</h1>
      <Link href={'/login'} className='border px-2'>Login</Link>
      <Link  href={'/signup'} className='border px-2'>Signup</Link>
      <Link href={'/resetpassword'} className='border px-2'>Forgot Password</Link>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  );
}