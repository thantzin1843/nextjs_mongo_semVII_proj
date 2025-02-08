import HotelList from '@/components/HotelList'
import HotelListPagination from '@/components/HotelListPagination'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
        <div className='my-3'><Link href="/admin/hotel/hotelRegisterForm" className='border border-primary shadow-lg rounded-md p-2'><PlusCircle className='inline'/> Register Hotels</Link></div>

        {/* Hotel List */}
       <div className='mt-5'>
        <HotelList/>
        <HotelListPagination/>
       </div>
    </div>
  )
}

export default page