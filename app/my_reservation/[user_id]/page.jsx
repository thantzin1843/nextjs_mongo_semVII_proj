'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Bed, BedDouble, Cross, Edit, Trash } from 'lucide-react';

function page() {
    const params = useParams();
    const user_id= params.user_id;

    const [reservations, setMyReservations] = useState([]);
    const fetchMyReservations = async () => {
        const res = await fetch(`/api/my_reservation?userId=${user_id}`);
        const data = await res.json();
        console.log(data);
        setMyReservations(data); // Uncomment when you have the API endpoint implemented
    }
    useEffect(()=>{
      fetchMyReservations();
    },[])

    const handleCancelBooking = async (id, roomId, checkIn, checkOut, no_of_rooms_reserved) => {
      console.log(id, roomId, checkIn, checkOut, no_of_rooms_reserved);
      try {
          const res = await fetch('/api/my_reservation', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  id, // Reservation ID
                  roomId, // Room ID
                  checkIn, // Check-in date
                  checkOut, // Check-out date
                  no_of_rooms_reserved, // Number of rooms reserved
              }),
          });
  
          const data = await res.json();
          console.log(data);
  
          if (res.ok) {
              // Refresh the reservations list
              fetchMyReservations();
          } else {
              console.error('Failed to cancel booking:', data.message);
          }
      } catch (error) {
          console.error('Error cancelling booking:', error);
      }
  };
  return (
    <div className='p-5'>
        <div className='text-3xl font-semibold mt-5'>My Reservations</div>
        <div></div>
        <Table className="mb-5">
                      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                      <TableHeader>
                        <TableRow>
                          <TableHead className="">Hotel</TableHead>
                          <TableHead className="">Room</TableHead>
                          <TableHead>Checkin</TableHead>
                          <TableHead>checkout</TableHead>
                          <TableHead>Total Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
    {
      reservations?.map((r,index)=>(
                        <TableRow key={index}>
                          <TableCell> 
                            <div className="text-xl font-bold py-5">{r?.property_id?.property_name}</div>
                          </TableCell>
                          <TableCell> 
                            <div className="text-xl font-bold py-5">{r?.roomId?.name}</div>
                          </TableCell>
                          <TableCell>
                          <div>{new Date(r?.checkIn).toLocaleDateString()}</div>
                          </TableCell>
                          <TableCell>
                          <div>
                            {new Date(r?.checkOut).toLocaleDateString()}
                          </div>
                          </TableCell>
                          <TableCell>
                          <div>
                            $ {r?.totalPrice}
                          </div>
                          </TableCell>
                          <TableCell>
                            <Button className="text-xl text-red-500 font-semibold" onClick={()=>handleCancelBooking(r?._id,r?.roomId?._id,r?.checkIn,r?.checkOut,r?.no_of_rooms_reserved)}><Trash className='inline me-3'/> Cancel Booking</Button>
                          </TableCell>
                          <TableCell>
                          <Dialog>
                    <DialogTrigger asChild>
                        <Button className="">Detail<Edit className='inline ms-2 text-xs'/> </Button>
                    </DialogTrigger>
                    <DialogContent className="w-1/3 h-[500px] overflow-y-auto">
                    <DialogTitle>
                    </DialogTitle>
                    <div className="text-xl text-primary font-semibold">Reservation Detail</div>
                    <div>Reservation No: {r?._id}</div>
                    <div>Hotel: {r?.property_id?.property_name}</div>
                    <div>Room: {r?.roomId?.name}</div>
                    <div>Checkin: {new Date(r?.checkIn).toLocaleDateString()}</div>
                    <div>Checkout: {new Date(r?.checkOut).toLocaleDateString()}</div>
                    <div>No of rooms reserved: {r?.no_of_rooms_reserved}</div>
                    <div>No of guests: {r?.numberOfGuests}</div>
                    <div className='my-3 text-xl text-primary font-semibold'>Contact informatioon</div>
                    <div>Guest: {r?.name}</div>
                    <div>Email: {r?.email}</div>
                    <div>Phone: {r?.phone}</div>
                    <div className="text-xl text-primary font-semibold">Pricing Information</div>
                    <div>Price per night: {r?.roomId?.price}</div>
                    <div>Total Price: $ {r?.totalPrice}</div>

                    <div className='border border-primary p-2 my-2 '>
                        <div className='text-xl font-semibold'>Property Offer facilities</div>
                        <div className="flex flex-wrap gap-2">
                        {
                            r?.property_id?.facilities?.map((facility,index)=>(
                                <div key={index} className='bg-primary text-sm p-1 rounded-md text-white'>{facility}</div>
                            ))
                        }
                        </div>
                    </div>

                    <div className='border border-primary p-2 my-2 '>
                        <div className='text-xl font-semibold'>Property Accessibilities</div>
                        <div className="flex flex-wrap gap-2">
                        {
                            r?.property_id?.property_accessibility?.map((a,index)=>(
                                <div key={index} className='bg-primary text-sm p-1 rounded-md text-white'>{a}</div>
                            ))
                        }
                        </div>
                    </div>

                    <div className='border border-primary p-2 my-2 '>
                        <div className='text-xl font-semibold'>Room Amenities</div>
                        <div className="flex flex-wrap gap-2">
                        {
                            r?.roomId?.amenities?.map((a,index)=>(
                                <div key={index} className='bg-primary text-sm p-1 rounded-md text-white'>{a}</div>
                            ))
                        }
                        </div>
                    </div>

                    <div className="flex gap-3">{r?.roomId?.twin>0 && <div className='text-sm text-primary'><Bed className='inline me-2'/>{r?.roomId?.twin} Twin Beds</div>}
                    {r?.roomId?.full>0 && <div className='text-sm text-primary'><BedDouble className='inline me-2'/>{r?.roomId?.full} Full Beds</div>}
                    {r?.roomId?.queen>0 && <div className='text-sm text-primary'><BedDouble className='inline me-2'/>{r?.roomId?.queen} Queen Beds</div>}
                    {r?.roomId?.king>0 && <div className='text-sm text-primary'><BedDouble className='inline me-2'/>{r?.roomId?.king} King Beds</div>}</div>
                  
                    </DialogContent>
                    </Dialog>
                          </TableCell>
                        </TableRow>
      ))
    }
                        
                      </TableBody>
                    </Table>
    </div>
  )
}

export default page