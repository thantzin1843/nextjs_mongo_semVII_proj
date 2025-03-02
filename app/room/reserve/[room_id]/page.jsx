'use client'
import { getUserId } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRoomDetailContext } from '@/context/RoomDetailContext';
import { useSearchFormContext } from '@/context/SearchContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, DoorClosed, PersonStanding } from 'lucide-react';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
  const router = useRouter();
    const {roomDetail} = useRoomDetailContext();

    const {room_id} = useParams();
    // const [room, setRoom] = useState(null);
    const {toast} = useToast();
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const checkIn =localStorage.getItem('checkin');
    const checkOut = localStorage.getItem('checkout');
    const [name, setname] = useState('');
    const [numberOfGuests, setnumberOfGuests] = useState(1);
    const [no_of_rooms_reserved,setno_of_rooms_reserved] = useState(1);
    const [nights, setnights] = useState(0);

    const openToast = (message) =>{
      toast({
        title: message,
        description: new Date().toLocaleString(),
        bg:'bg-green-500 text-white'
        
      })
    }

    useEffect(()=>{
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDifference = checkOutDate - checkInDate;
      const nights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setnights(nights)
    },[])

    const handleReserve = async () => {

      const userId = await getUserId().then(res=>res.data._id);  
      const loadData = {
        name,
        userId,
        roomId:roomDetail?._id,
        email,
        phone,
        property_id:roomDetail?.property_id?._id,
        checkIn,
        checkOut,
        numberOfGuests,
        no_of_rooms_reserved:no_of_rooms_reserved,
        totalPrice:roomDetail?.price * nights,
      }
      console.log(loadData);
      try {
        const response = await fetch("/api/reserve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loadData),
        });
    
        const result = await response.json();
        openToast("Successful Reservation")
        router.push(`/`)
      } catch (error) {
        console.error("Error:", error);
      }
    }

  return (
    <div className='flex p-5 '>
        <div className='border w-1/3 me-3 border-primary p-3 rounded-md '>
          <div className='text-3xl font-semibold'>{roomDetail?.property_id?.property_name}</div>
          <div className='text-xl my-3'><DoorClosed className='inline me-2'/> {roomDetail?.name}</div>

           <div className='my-2 text-xl'>

            Total Cost - {roomDetail?.price * nights} for {nights} nights <span> ($ {roomDetail?.price} per night) </span>
           </div>
        </div>

        <div className="w-2/3 mt-3  shadow-lg border border-primary p-5 mx-auto rounded-lg">
           
        <label htmlFor="" className='text-sm'>Name</label>
             <Input type="text" placeholder=""  className="mb-5 border border-primary " value={name} onChange={(e)=>setname(e.target.value)}/>   
            <label htmlFor="" className='text-sm'>Contact Email</label>
             <Input type="text" placeholder="example@gmail.com"  className="mb-5 border border-primary " value={email} onChange={(e)=>setemail(e.target.value)}/>   
             <label htmlFor="" className='text-sm'>Phone</label>
             <Input type="text" placeholder="09..."  className="mb-5 border border-primary" value={phone} onChange={(e)=>setphone(e.target.value)}/> 
             <label htmlFor="" className='text-sm'>Check-in Date</label>
             <div className='flex mb-5 gap-3'><Calendar/> {new Date(checkIn).toISOString().split('T')[0]} </div>

             <label htmlFor="" className='text-sm'>Check-out Date</label>
             <div className='flex mb-5 gap-3'><Calendar/> {new Date(checkOut).toISOString().split('T')[0]} </div>
             
             <label htmlFor="" className='text-sm'>No. of Guests {roomDetail?.no_of_guests}  <span className='text-red-500 '>( {roomDetail?.availableRoomsCount} guests can stay )</span></label>
             <Input
              type="number"
              placeholder=""
              className="mb-5 border border-primary"
              value={numberOfGuests}
              onChange={(e) => {
                if (e.target.value <= roomDetail?.no_of_guests && e.target.value > 0) {
                  setnumberOfGuests(e.target.value);
                }
              }}
            />
             <label htmlFor="" className='text-sm'>No. of Rooms <span className='text-red-500 '>( {roomDetail?.availableRoomsCount} rooms left )</span></label>
              <Input
              type="number"
              placeholder=""
              className="mb-5 border border-primary"
              value={no_of_rooms_reserved}
              onChange={(e) => {
                if (e.target.value <= roomDetail?.availableRoomsCount && e.target.value > 0) {
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