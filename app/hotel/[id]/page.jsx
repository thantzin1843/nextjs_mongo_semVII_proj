import Facilities from '@/components/Facilities'
import HouseRules from '@/components/HouseRules'
import Overview from '@/components/Overview'
import PropertyImages from '@/components/PropertyImages'
import SearchHotelForm from '@/components/SearchHotelForm'
import { MapPin } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div>
        <SearchHotelForm />
        {/* Rest of the page content */}

        <div className='w-5/6 mt-5 mx-auto'>
            <div className="font-bold flex gap-2 text-sm text-primary mb-2">
            <MapPin/> Corner of Kan Yeik Thar Road and U Aung Myat Road Mingalar Taung Nyunt Township, 11221 Yangon, Myanmar

            </div>
            {/* Other components */}
            <PropertyImages/>
            <div>
              <Overview/>
            </div>
            <div>
              <Facilities/>
            </div>
            <div>
              <HouseRules/>
            </div>
        </div>
    </div>
  )
}

export default page