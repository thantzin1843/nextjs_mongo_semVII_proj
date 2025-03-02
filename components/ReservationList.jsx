'use client'
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
import { Button } from './ui/button'
import { Edit } from 'lucide-react'
function ReservationList({userId}) {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchReservations = async () => {
        setLoading(true)
        const response = await fetch(`/api/reserve?userId=${userId}`)
        const data = await response.json()
        // console.log(data?.reservations)
        data?.reservation && setReservations(data)
        setLoading(false)
    }
    useEffect(()=>{
        fetchReservations();
    },[])
    
  return (
    <div>
        <div className='text-xl mb-2'>Reservations List</div>
            
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
                        <TableRow className="w-full">
                          <TableCell>

                        {
                              loading && (
                                <div className=" flex mx-auto w-1/2 flex-col items-center justify-center">
                                  <div className="w-8 h-8 border-4 mb-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p>Fetching Reservations</p>
                                </div>
                              )
                            }
                          </TableCell>
                        </TableRow>
                        
    {
       !loading && reservations?.length !== 0 &&
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
                          <Dialog>
                    <DialogTrigger asChild>
                        <Button className="">Detail<Edit className='inline ms-2 text-xs'/> </Button>
                    </DialogTrigger>
                    <DialogContent className="w-1/3 h-[500px] overflow-y-auto">
                    <DialogTitle>
                    </DialogTitle>
                    <div className="text-xl text-primary font-semibold">Reservation Detail</div>

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

export default ReservationList