'use client'
import Facilities from '@/components/Facilities'
import HotelReview from '@/components/HotelReview'
import HouseRules from '@/components/HouseRules'
import Overview from '@/components/Overview'
import PropertyImages from '@/components/PropertyImages'
import Room from '@/components/Room'
import SearchHotelForm from '@/components/SearchHotelForm'
import UserRoom from '@/components/UserRoom'
import { useRoomDetailContext } from '@/context/RoomDetailContext'
import { MapPin } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
   const {roomDetail, updateRoomDetail} = useRoomDetailContext();

  return (
    <div>
     <div className='w-5/6 mt-5 mx-auto'>
            <div className="font-bold flex gap-2 text-sm text-primary mb-2">
            <MapPin/> {roomDetail?.property_id?.location?.address},{roomDetail?.property_id?.location?.city}
            {roomDetail?.property_id?.location?.zipcode},{roomDetail?.property_id?.location?.country}

            </div>
            {/* Other components */}
            <PropertyImages images={roomDetail?.images}/>
            <div>
              <Overview name={roomDetail?.property_id?.property_name} property={roomDetail?.property_id}/>
            </div>
            <div className="flex gap-2">

            <UserRoom room={roomDetail} images={roomDetail?.images} />

            </div>
            <div className='mt-3'>
              <Facilities property={roomDetail?.property_id}/>
            </div>

            <div>
              <HotelReview userId={roomDetail?.property_id?.userId} property_id={roomDetail?.property_id?._id}/>
            </div>
            <div>
              <HouseRules property={roomDetail?.property_id}/>
            </div>
        </div>
    </div>
  )
}

export default page