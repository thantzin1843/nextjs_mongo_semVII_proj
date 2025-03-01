import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogIn, User, UserCircle, UserRound } from 'lucide-react'
import { doLogout } from '@/app/actions'
import Link from 'next/link'
import { auth } from '@/auth'
import Image from 'next/image'
async function Nav() {
  const session = await auth();
  return (
    <div className='bg-white shadow-md h-[75px] flex items-center justify-between  px-5'>
        <div className='bg-red-500 w-[100px] h-[100px] border border-primary'>
          <Link href='/'><img src="/logobook.png" className='w-full h-full' /></Link>
        </div>
        <Popover>
                <PopoverTrigger>
                {session?.user?.name ? 
          (
           <div className='flex'> 
            <Link href={`/property_list/${session?.user?._id}`} className='me-3 bg-primary flex gap-2 p-2 rounded-md text-white'>List Your Property</Link>
            <div className=' flex items-center border border-primary p-1 rounded-md gap-3'><UserCircle size={20}/> {session?.user?.name}</div>
           </div>
          )  : (
            <Link href="/login" className='bg-primary flex gap-2 p-2 rounded-md text-white'><LogIn/> Login</Link>
          )
          }
                    {/* <div className='border-primary rounded-md p-2 gap-3 border flex'>
                    <UserCircle size={20}/> {session?.user?.name}
                    </div> */}
                    
                </PopoverTrigger>
                <PopoverContent className="p-2">
                    <Link href='' className='block text-center py-2 border-b'>Profile</Link>
                    <Link href={`/my_reservation/${session?.user?._id}`} className='block text-center py-2 border-b'>My reservations</Link>
                    
                    <form action={doLogout}>
                        <button className="bg-primary w-full my-2 text-white p-1 rounded" type="submit">Logout</button>
                    </form>
                </PopoverContent>
            </Popover>
    </div>
  )
}

export default Nav