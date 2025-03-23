'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { AlertCircle, ArrowRightCircle, BathIcon, Bed, BedDouble, Building, Check, Cigarette, ExternalLinkIcon, Hotel, Images, Mountain, Utensils } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUserId } from '@/app/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function UserRoom({room,images}) {
    const router = useRouter();
    const [roomImages,seRoomImages] = useState([]);

    const fetchRoomImages = async (roomId) => {
        const response = await fetch(`/api/room/images?roomId=${roomId}`);
        const data = await response.json();
        seRoomImages(data[0]?.images);
    }
    useEffect(()=>{
        fetchRoomImages(room._id)
    },[])

    const handleReserve =()=>{
        router.push(`/room/reserve/${room._id}`)
    }
  return (
    <div className='w-1/4 p-1'>
                <div className="border border-primary shadow rounded-lg w-full overflow-hidden relative">
                <Carousel className="w-full">
                <CarouselContent>
                    { roomImages?.map((c,index)=>(
                    <CarouselItem key={index}>

                        <Card>
                            <CardContent className="w-full bg-gray-500">
                            <div className="w-full h-[170px]">
                                <img src={process.env.NEXT_PUBLIC_URL_ENDPOINT+c?.name} className='w-full h-full'/>
                            </div>
                           
                            </CardContent>
                        </Card>

                    </CarouselItem>
                    ))} 
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>

                            <div className="absolute top-1 left-1 text-white bg-[#00000088] p-1 rounded">
                               <Images className='me-2 inline'/>{roomImages?.length}
                            </div>
                    <div className="p-3 flex flex-col justify-between  min-h-[350px]">
                   <div>
                   <div className='text-xl mb-2 font-bold text-primary'>
                        {room.name}
                    </div>
                    <div className="flex items-center mb-2 gap-2">
                        <div className='bg-black p-2 rounded-md text-white'>3</div>
                        <div className='text-sm'>
                            <div className="font-bold">Very good</div>
                            <div>5 reviews</div>
                        </div>
                    </div>
                    <div>
                        {
                            room?.amenities?.slice(0, 5).map((n,index)=>{
                                return(
                                    <div key={index} className='text-xs mb-1'><Check className='inline me-1'/>{n}</div>
                                )
                            })
                        }
                    </div>
                    <div className='mt-1'>
                    <Dialog>
                    <DialogTrigger asChild>
                        <button className="text-blue-500 text-sm">More Detail<ArrowRightCircle className='inline ms-2 text-xs'/> </button>
                    </DialogTrigger>
                    <DialogContent className="w-2/3 h-[500px] overflow-y-auto">
                    <DialogTitle>
                    {room?.name}
                    </DialogTitle>
                    
                    <div>{room?.width} square feet</div>
                    <div className="flex flex-wrap">
                    {
                        images?.map((item,index)=>(
                        <div className="w-1/3 h-[150px] border p-1 border-white hover:border-blue-500" key={index}>
                            <img src={process.env.NEXT_PUBLIC_URL_ENDPOINT+item?.name} className='w-full h-full' alt="" />
                        </div>
                        ))
                    }

                    </div>

                    <div className="flex gap-3">{room?.twin>0 && <div className='text-sm text-primary'><Bed className='inline me-2'/>{room?.twin} Twin Beds</div>}
                    {room?.full>0 && <div className='text-sm text-primary'><BedDouble className='inline me-2'/>{room?.full} Full Beds</div>}
                    {room?.queen>0 && <div className='text-sm text-primary'><BedDouble className='inline me-2'/>{room?.queen} Queen Beds</div>}
                    {room?.king>0 && <div className='text-sm text-primary'><BedDouble className='inline me-2'/>{room?.king} King Beds</div>}</div>
                    
                    <div>
                        No of guests can stay : {room?.no_of_guests}
                    </div>
                    <div>
                        {room?.smoking && <div className=''> <Cigarette className='inline me-2'/> Smoking is allowed</div>}
                    </div>

                    <hr />
                    
                    <div className="flex gap-[60px]">
                    <div className=''>
                    <div className=" text-md font-bold mb-3"><Mountain size={20} className='inline me-1'/> Outdoor and views</div>
                    <div>
                        {
                            room?.outdoor_and_view?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1 items-center" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                    
                    </div>
                    <div className=''>
                    <div className=" text-md font-bold mb-3"><Utensils size={20} className='inline me-1'/> Food Offers</div>
                    <div>
                        {
                            room?.food?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1 items-center" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                    
                    </div>

                    <div className=''>
                    <div className=" text-md font-bold mb-3"><BathIcon size={20} className='inline me-1'/> Bathroom items</div>
                    <div>
                        {
                            room?.bathroom_items?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1 items-center" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                    
                    </div>
                    <div className=''>
                    <div className=" text-md font-bold mb-3"><Building size={20} className='inline me-1'/> General Amenities</div>
                    <div>
                        {
                            room?.amenities?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1 items-center" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                    
                    </div>
                    </div>
<hr />
                    <div>
                        
                        {room?.description} 
                    </div>
               
                    <div className='flex text-red-500 '>
                        <AlertCircle />{room?.availableRoomsCount} rooms left
                    </div>
                    <div>
                        {room?.price} $ per night
                    </div>
                    <Button onClick={()=>handleReserve()} className='bg-primary py-2 px-3 rounded-md text-white'>Reserve</Button>

                    
                    </DialogContent>
                    </Dialog>
                    </div>
                    </div>
                    <div className='flex text-red-500 '>
                        <AlertCircle />{room?.availableRoomsCount} rooms left
                    </div>
                    <div className='flex justify-between '>

                        <div><span className='font-bold text-xl'>${room?.price}</span> per night</div>
                        <div>
                          <Button onClick={()=>handleReserve()} className='bg-primary py-2 px-3 rounded-md text-white'>Reserve</Button>
                        </div>
                    </div>
                    </div>


                </div>
            </div>
  )
}

export default UserRoom


