import { Milestone } from 'lucide-react'
import React from 'react'

function Overview({name,property}) {
  return (
    <div>
        <div className="text-2xl">{name}</div>
        <div className="text-sm text-primary "><Milestone className='inline' size={20}/> {property?.from_city?.distance} {property?.from_city?.unit || 'km'} from the center of city</div>
        <div>
            {Array.from({ length: property?.star_rating }, (_, index) => (
            
            <span key={index} style={{ fontSize: '15px', color: 'gold' }}>⭐</span>
          ))}
        </div>
        <div className="flex">
        <div className="text-sm w-3/4">
        {property?.description}
        </div>
        <div className='p-2 w-1/4'>
        <iframe src={property?.location?.mapLink} className='w-full' height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        </div>
        
    </div>
  )
}

export default Overview