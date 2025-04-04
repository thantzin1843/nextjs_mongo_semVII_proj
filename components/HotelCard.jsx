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
import Link from 'next/link'

function HotelCard({property}) {
    const {images} = property;
    const imageNames = images[0];

  return (
    <div className='w-full shadow-sm border border-gray-300 rounded-md p-3 flex mt-5 hover:border-primary hover:shadow-lg'>
        <div className="w-1/3">
                        <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            { 
                            
                            imageNames?.map((c,index)=>(
                            <CarouselItem key={index}>
        
                                <Card>
                                    <CardContent className="w-full bg-red-500">
                                    <div className="w-full h-[190px]">
                                        <img src={process.env.NEXT_PUBLIC_URL_ENDPOINT+c.name} className='w-full h-full'/>
                                        <div>{c.name}</div>
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
         <div className='font-bold text-xl'>{property.property_name}</div>

         <div className='flex items-center flex-wrap '>
         <StarRating count={property.star_rating} /> &nbsp;
         <div className='text-xs text-blue-500'> <MapPin className='inline '/> {property.location.address},{property.location.city}</div>
         </div>

         <div className='text-sm text-primary '>
            {property.from_city.distance} {property.from_city.unit || 'km'} from downtown
         </div>

         <div>
            This property offers:
            <div className="flex flex-wrap gap-1 mt-2">
            {
                property.facilities.slice(0,5).map((item,index)=>(
                    <div className='bg-primary text-white rounded-md py-1  px-1  text-xs flex items-center' key={index}>
                                {item}
                    </div>
                ))
            }
            </div>
            
         </div>

        </div>
        <div className="w-1/3 flex flex-col items-end justify-between">
        <div className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <Heart/>
        </div>
         <div>
         <div className='text-end mb-3 underline'><MessageSquare className='inline'/> 5 reviews</div>
         <Link href={`/hotel/${property._id}`} className='p-2 bg-primary text-white'>Show prices</Link>
         </div>
        </div>
                       
    </div>
  )
}

export default HotelCard