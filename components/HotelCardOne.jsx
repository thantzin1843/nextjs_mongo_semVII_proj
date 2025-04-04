'use client'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { propertyCategories } from '@/context/data'
import { Card, CardContent } from './ui/card'
import { StarRating } from '@/app/search/page'
import { AlertCircle, BadgeDollarSign, Check, DollarSign, Heart, LocateFixed, LocateIcon, MapPin, MessageSquare, PartyPopper, Utensils, Wifi } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useRoomDetailContext } from '@/context/RoomDetailContext'
import { useRouter } from 'next/navigation'
import { getUserId } from '@/app/actions'

function HotelCardOne({room}) {
    const {roomDetail, updateRoomDetail} = useRoomDetailContext();
    const [fav, setFav] = useState(false);
    const router = useRouter();
    const handleRoomDetail = (room) =>{
        updateRoomDetail(room)
        router.push(`/room/detail`)
    }

    const getFav = async()=>{
        try {
            const d = await getUserId();
            const userId = d?.data?._id
            const response = await fetch(`/api/user/fav?roomId=${room?._id}&userId=${userId}`,{method: 'GET'  });
            const data = await response.json();
            setFav(data.isFav)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getFav();
    },[])

    const handleFav = async()=>{
            const da = await getUserId();
            const userId = da?.data?._id
           
            setFav(!fav);

            const response = await fetch('/api/user/fav', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomId: room?._id, userId:userId, fav:!fav })
              });
              const data = await response.json();
              console.log(data)
    }
  return (
    <div className='w-full shadow-sm border border-gray-300 rounded-md p-3 flex mt-5 hover:border-primary hover:shadow-lg'>
        <div className="w-1/3 flex items-center">
                        <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            { 
                            room?.images?.length >0 && 
                            room?.images?.map((c,index)=>(
                            <CarouselItem key={index}>
        
                                <Card>
                                    <CardContent className="w-full bg-gray-500">
                                    <div className="w-full h-[260px]">
                                        <img src={process.env.NEXT_PUBLIC_URL_ENDPOINT+c.name} className='w-full h-full'/>
                                    </div>
                                   
                                    </CardContent>
                                </Card>
        
                            </CarouselItem>
                            ))}
                            {}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                        </Carousel>
        </div>
        <div className="w-1/3 ps-2">
         <div className='font-bold text-xl'>{room?.property_id?.property_name}'s {room?.name}</div>

         <div className='flex items-center flex-wrap '>
         <StarRating count={room?.property_id?.star_rating} /> &nbsp;
         <div className='text-xs text-blue-500'> <MapPin className='inline '/> {room?.property_id?.location?.address},{room?.property_id?.location?.city}</div>
         </div>

         <div className='text-sm text-primary '>
            {room?.property_id?.from_city?.distance} {room?.property_id?.from_city?.unit || 'km'} from downtown
         </div>

         <div>
            Property offers:
            <div className="flex flex-wrap gap-1 mt-2">
            {
                room?.property_id?.facilities.slice(0,3).map((item,index)=>(
                    <div className='bg-primary text-white rounded-md py-1  px-1  text-xs flex items-center' key={index}>
                                {item}
                    </div>
                ))
            }
            </div>
            
         </div>

         <div>
            Room offers:
            <div className="flex flex-wrap gap-1 mt-2">
            {
                room?.amenities?.slice(0,3).map((item,index)=>(
                    <div className='bg-primary text-white rounded-md py-1  px-1  text-xs flex items-center' key={index}>
                        {item}
                    </div>
                ))
            }
            </div>
            
         </div>

        </div>
        <div className="w-1/3 flex flex-col items-end justify-between">
        <div className={fav ? 'p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white' : 'p-2 rounded-full bg-gray-200 hover:bg-gray-300'} onClick={handleFav}>
            <Heart/>
        </div>
         <div>
         <div className='text-end flex items-center text-red-500 gap-1 mb-1'><AlertCircle className='inline'/> {room?.availableRoomsCount} Rooms Left</div>
         <div className='text-end flex items-center  gap-1 mb-3'> ${room?.price} per night</div>
         {/* <div className='text-end mb-3 underline'><MessageSquare className='inline'/> 5 reviews</div> */}
         <Button onClick={()=>handleRoomDetail(room)} className='p-2 bg-primary text-white'>Details</Button>
         </div>
        </div>
                       
    </div>
  )
}

export default HotelCardOne