'use client'
import { getUserId } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DoorClosed, PersonStanding } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const {room_id} = useParams();
    const [room, setRoom] = useState(null);

    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [checkIn, setcheckIn] = useState(new Date());
    const [checkOut, setcheckOut] = useState(new Date());
    const [numberOfGuests, setnumberOfGuests] = useState(1);
    const [no_of_rooms_reserved,setno_of_rooms_reserved] = useState(1);
    const [nights, setnights] = useState(0);

    const fetchRoom = async () => {
        const res = await fetch(`/api/room/edit?room_id=${room_id}`);
        const data = await res.json();
        console.log(data?.room[0])
        setRoom(data?.room[0]);
    }
    useEffect(()=>{
        fetchRoom()
    },[])

    useEffect(()=>{
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDifference = checkOutDate - checkInDate;
      const nights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setnights(nights)
    },[checkIn, checkOut])

    const handleReserve = async () => {

      const userId = await getUserId().then(res=>res.data._id);  
      const data = {

        userId,
        roomId:room._id,
        email,
        phone,
        checkIn,
        checkOut,
        numberOfGuests,
        no_of_rooms_reserved:no_of_rooms_reserved,
        totalPrice:room?.price * nights,
        status: 'pending'
      }
        // const res = await fetch(`/api/room/reserve?room_id=${room_id}&email=${email}&phone=${phone}&checkIn=${checkIn}&checkOut=${checkOut}&numberOfGuests=${numberOfGuests}`);
        // const data = await res.json();
        console.log(data)
    }

  return (
    <div className='flex p-5 '>
        <div className='border w-1/3 me-3 border-primary p-3 rounded-md '>
          <div className='text-3xl font-semibold'>Novotel</div>
          <div className='text-xl my-3'><DoorClosed className='inline me-2'/> Single Room</div>

          <div className='flex w-full gap-2 my-2'>
            <div className="w-1/2 border border-primary rounded-md p-2 ">
            <div>Check-in Date</div>
            <div>2024-1-12</div>
            </div>

            <div className="w-1/2 border border-primary rounded-md p-2 ">
            <div>Check-out Date</div>
            <div>2024-1-12</div>
            </div>


           </div>

           <div><span className='my-2 font-bold text-xl'>2</span> Guests can stay in this room.</div>

           <div className='my-2 font-bold text-red-500 text-xl '>Only 6 rooms are available.</div>

            <div className='my-2 text-xl'>No of Rooms booked - 8</div>
           <div className='my-2 text-xl'>

            Total Cost - $400 for 4 nights <span> ($100 per night) </span>
           </div>
        </div>

        <div className="w-2/3 mt-3  shadow-lg border border-primary p-5 mx-auto rounded-lg">
           

            <label htmlFor="" className='text-sm'>Contact Email</label>
             <Input type="text" placeholder="example@gmail.com"  className="mb-5 border border-primary " value={email} onChange={(e)=>setemail(e.target.value)}/>   
             <label htmlFor="" className='text-sm'>Phone</label>
             <Input type="text" placeholder="09..."  className="mb-5 border border-primary" value={phone} onChange={(e)=>setphone(e.target.value)}/> 
             <label htmlFor="" className='text-sm'>Check-in Date</label>
             <Input type="date" placeholder="Country"  className="mb-5 border border-primary" value={checkIn} onChange={(e)=>setcheckIn(e.target.value)}/> 
             <label htmlFor="" className='text-sm'>Check-out Date</label>
             <Input type="date" placeholder="City"  className="mb-5 border border-primary" value={checkOut} onChange={(e)=>setcheckOut(e.target.value)}/>              
             <label htmlFor="" className='text-sm'>No. of Guests</label>
             <Input
              type="number"
              placeholder=""
              className="mb-5 border border-primary"
              value={numberOfGuests}
              onChange={(e) => {
                if (e.target.value <= room?.no_of_guests && e.target.value > 0) {
                  setnumberOfGuests(e.target.value);
                }
              }}
            />
             <label htmlFor="" className='text-sm'>No. of Rooms</label>
              <Input
              type="number"
              placeholder=""
              className="mb-5 border border-primary"
              value={no_of_rooms_reserved}
              onChange={(e) => {
                if (e.target.value <= room?.no_of_rooms && e.target.value > 0) {
                  setno_of_rooms_reserved(e.target.value);
                }
              }}
            /> 
             <Button className="" onClick={handleReserve}>Reserve Room</Button>
        </div>
    </div>
  )
}

export default page