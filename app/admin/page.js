import { auth } from '@/auth'
import React from 'react'
import { doLogout } from '../actions';

async function page() {
  const session = await auth();
  return (
    <div>
       <h1 className="text-3xl mt-[50px] bg-red-500">
              Welcome, {session?.user?.role}
              
            </h1>
    </div>
  )
}

export default page