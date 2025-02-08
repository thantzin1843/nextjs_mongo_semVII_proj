import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Search, User } from 'lucide-react'
import Link from 'next/link'
import { doLogout } from '@/app/actions'

function TopMenu() {
  return (
    <div className=' w-full py-2 px-5 grid grid-cols-3 border-b'>
        <div className='text-3xl'>Dashboard</div>
        <div className='flex justify-end pe-3'>
            <Popover>
                <PopoverTrigger>
                    <div className='p-1 bg-primary text-white border rounded-full'>
                    <User/>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="p-2">
                    <Link href='' className='block text-center py-2 border-b'>Profile</Link>
                    <Link href='' className='block text-center py-2 border-b'>Settings</Link>
                    
                    <form action={doLogout}>
                        <button className="bg-primary w-full my-2 text-white p-1 rounded" type="submit">Logout</button>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
        <div className='flex'>
        <Input className="me-1" placeholder="Search hotels..."/>
        <Button> <Search/> </Button>
        </div>
    </div>
  )
}

export default TopMenu