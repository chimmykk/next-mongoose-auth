"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Dashboard from './dashboard/page';

export default function Home() {

  const { status } = useSession();

  if (status === "authenticated") {
    return < Dashboard/>
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1>Welcome to the Homepage</h1>
      <Link href={'/login'} className='border px-2'>Login</Link>
      <Link  href={'/signup'} className='border px-2'>Signup</Link>
    </div>
  );
}
