'use client'
import { getUserId } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    <div>
        <div className="w-1/2 col-span-1 shadow-lg border border-primary p-5 mx-auto rounded-lg">
            <div className='border border-primary p-2 rounded-lg'>
              <h1 className='text-primary text-xl '>Room Informations</h1>
              <h2 className="text-xl font-bold">{room?.name}</h2>
              <p className="text-md">Price per night: ${room?.price}</p>
              <p className="text-md">Total Price for ${nights} nights booking: ${room?.price * nights}</p>
              <p className="text-md">Max Guests for this room: {room?.no_of_guests}</p>
            </div>

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