"use client"

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Room from '@/components/Room';
import { Input } from '@/components/ui/input';
import { PlusSquare } from 'lucide-react';


function page() {
    const params = useParams();
    const property_id = params.property_id;
    const [rooms, setRooms] = useState([]);
   
  return (
        <div className="w-3/4 mx-auto mt-5">
            <div className='flex justify-between py-5 border-b'>
                <div className='flex gap-2 items-center '><Input className="border border-primary w-[400px]" placeholder="Search rooms"/><Button>Search </Button></div>
                <Link href={`/property_list/room/create/${property_id}`}><Button><PlusSquare className='inline'/> Create Room</Button></Link>
            </div>

           <div className='flex flex-wrap mx-auto my-3'>
              <Room/>
            </div>

            
        </div>
  )
}

export default page