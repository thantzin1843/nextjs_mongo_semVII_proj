import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LogIn, User } from 'lucide-react'
import { auth } from '@/auth'

async function Navbar() {
  const session = await auth();
  // console.log(session.user.role)
  return (
    <div className='flex justify-between h-[70px] items-center'>
        <div>
            Logo
        </div>
        <div className='flex gap-[50px]'>
            <Link href="/" className='hover:scale-105 hover:font-bold'>Home</Link>
            <Link href="/" className='hover:scale-105 hover:font-bold'>Hotels</Link>
        </div>
        <div className='flex items-center gap-3'>
          {session?.user?.name ? 
          (
           <div className='flex'> 
            <Link href={`/property_list`} className='me-3'><Button>List Your Property</Button></Link>
            <div className=' flex items-center border border-primary p-1 rounded-md'><User/> {session?.user?.name}</div>
           </div>
          )  : (
            <Link href="/login"><Button><LogIn/> Login</Button></Link>
          )
          }
            
           

        </div>
    </div>
  )
}

export default Navbar