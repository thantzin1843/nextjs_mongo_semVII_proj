import React from 'react'
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
import { Check, Heart, LocateFixed, LocateIcon, MapPin, MessageSquare, PartyPopper, Utensils, Wifi } from 'lucide-react'
import { Button } from './ui/button'

function HotelCard() {
  return (
    <div className='w-full shadow-sm border border-gray-300 rounded-md p-3 flex mt-5 hover:border-primary hover:shadow-lg'>
        <div className="w-1/3">
                        <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            { propertyCategories.map((c,index)=>(
                            <CarouselItem key={index}>
        
                                <Card>
                                    <CardContent className="w-full bg-red-500">
                                    <div className="w-full h-[190px]">
                                        <img src={c.image} className='w-full h-full'/>
                                    </div>
                                   
                                    </CardContent>
                                </Card>
        
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                        </Carousel>
        </div>
        <div className="w-1/3 ps-2">
         <div className='font-bold text-xl'>Hotel Sahara</div>

         <div className='flex items-center flex-wrap '>
         <StarRating count={3} /> &nbsp;
         <div className='text-xs text-blue-500'> <MapPin className='inline '/> Central Yangon, 7miles</div>
         </div>

         <div className='text-sm text-primary '>
            5km from downtown
         </div>

         <div>
            This property offers:
            <div className="flex flex-wrap gap-1 mt-2">
            <div className='bg-primary text-white rounded-md py-1  px-1  text-xs flex items-center'>
                Breakfast
            </div>
            <div className='bg-primary text-white rounded-md py-1  px-1  text-xs  flex items-center'>
                Wifi
            </div>
            <div className='bg-primary text-white rounded-md  py-1 px-1  text-xs  flex items-center'>
                Party
            </div>
            <div className='bg-primary text-white rounded-md  py-1 px-1  text-xs  flex items-center'>
                Party
            </div>
            <div className='bg-primary text-white rounded-md  py-1 px-1  text-xs  flex items-center'>
                Party
            </div>
            <div className='bg-primary text-white rounded-md  py-1 px-1  text-xs  flex items-center'>
                Party
            </div>
            

            </div>
            
         </div>

        </div>
        <div className="w-1/3 flex flex-col items-end justify-between">
        <div className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <Heart/>
        </div>
         <div>
         <div className='text-end mb-3 underline'><MessageSquare className='inline'/> 5 reviews</div>
         <Button>Show prices</Button>
         </div>
        </div>
                       
    </div>
  )
}

export default HotelCard