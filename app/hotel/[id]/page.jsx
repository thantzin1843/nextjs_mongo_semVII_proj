'use client'
import Facilities from '@/components/Facilities'
import HotelReview from '@/components/HotelReview'
import HouseRules from '@/components/HouseRules'
import Overview from '@/components/Overview'
import PropertyImages from '@/components/PropertyImages'
import Room from '@/components/Room'
import SearchHotelForm from '@/components/SearchHotelForm'
import UserRoom from '@/components/UserRoom'
import { MapPin } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
  const params = useParams();
  const id = params.id;

  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchProperty = async () => {
    const res = await fetch(`/api/property/detail?property_id=${id}`);
    const data = await res.json();
    setProperty(data?.property[0]);
    setImages(data?.images[0]?.images);
    setRooms(data?.rooms);
  }

  useEffect(()=>{
    fetchProperty();
  },[])
  return (
    <div>
        {/* <h1>Property Details - {id}</h1> */}
        <SearchHotelForm />
        {/* Rest of the page content */}

        <div className='w-5/6 mt-5 mx-auto'>
            <div className="font-bold flex gap-2 text-sm text-primary mb-2">
            <MapPin/> {property?.location?.address},{property?.location?.city}, {property?.location?.zipcode},{property?.location?.country}

            </div>
            {/* Other components */}
            <PropertyImages images={images}/>
            <div>
              <Overview name={property?.property_name} property={property}/>
            </div>
            <div className="flex gap-2">
            {
              rooms?.map((room, index) => (
                <UserRoom room={room} images={room?.images[0]} key={index}/>
              ))
            }
            </div>
            <div className='mt-3'>
              <Facilities property={property}/>
            </div>

            <div>
              <HotelReview/>
            </div>
            <div>
              <HouseRules property={property}/>
            </div>
        </div>
    </div>
  )
}

export default page