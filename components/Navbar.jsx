import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LogIn, User } from 'lucide-react'
import { auth } from '@/auth'

async function Navbar() {
  const session = await auth();
  // console.log(session.user.role)
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          {/* {session?.user?.name ? 
          (
           <div className='flex'> 
            <Link href={`/property_list/${session.user._id}`} className='me-3 bg-primary flex gap-2 p-2 rounded-md text-white'>List Your Property</Link>
            <div className=' flex items-center border border-primary p-1 rounded-md'><User 
            /> {session?.user?.name}</div>
           </div>
          )  : (
            <Link href="/login" className='bg-primary flex gap-2 p-2 rounded-md text-white'><LogIn/> Login</Link>
          )
          } */}
            
           

        </div>
    </div>
  )
}

export default Navbar