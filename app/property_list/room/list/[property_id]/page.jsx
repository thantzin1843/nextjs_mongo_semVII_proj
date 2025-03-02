"use client"

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Room from '@/components/Room';
import { Input } from '@/components/ui/input';
import { Database, PlusSquare } from 'lucide-react';


function page() {
    const params = useParams();
    const property_id = params.property_id;
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchRooms = async () => {
      setLoading(true)
        const res = await fetch(`/api/room?property_id=${property_id}`);
        const data = await res.json();
        setRooms(data);
        setLoading(false)
    }
    useEffect(()=>{
      fetchRooms();
    },[])

    const updateRooms = (room_id) => {
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room._id !== room_id)
      );
    }

  return (
        <div className="w-3/4 mx-auto mt-5">
            <div className='flex justify-end py-5 border-b'>
                {/* <div className='flex gap-2 items-center '><Input className="border border-primary w-[400px]" placeholder="Search rooms"/><Button>Search </Button></div> */}
                <Link href={`/property_list/room/create/${property_id}`}><Button><PlusSquare className='inline'/> Create Room</Button></Link>
            </div>

           <div className='flex flex-wrap mx-auto my-3'>
            {
              loading && (
                <div className=" flex mx-auto w-1/2 flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 mb-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p>Fetching rooms</p>
                     </div>
              )
            }
           
            {
              (!loading && rooms.length > 0) ? (
              rooms.map((room,index)=>(
                  <Room room={room} key={index} forRole="admin" updateRooms={updateRooms}/>
              ))):(
                  <div className='flex justify-center text-xl text-gray-400'><Database className='inline me-3'/> No room is created.</div>
              )
            }
              
            </div>

            
        </div>
  )
}

export default page