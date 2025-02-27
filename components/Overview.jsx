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
        Conveniently set in the 15th arr. District of Paris, Sublim by Sweett is located a 18-minute walk from Rodin Museum, 1.4 miles from Orsay Museum and 1.5 miles from Eiffel Tower. Each room at the 3-star hotel has city views and free WiFi. Paris Expo – Porte de Versailles is 1.6 miles from the hotel and Luxembourg Gardens is 1.7 miles away.

At the hotel, every room comes with a closet. Complete with a private bathroom equipped with free toiletries, guest rooms at Sublim by Sweett have a flat-screen TV and air conditioning, and selected rooms include a balcony. The rooms will provide guests with a desk and a coffee machine.

Musée de l'Orangerie is 1.8 miles from the accommodation, while Tuileries Garden is 2.1 miles away. Paris - Orly Airport is 8.7 miles from the property.

Couples in particular like the wonderful location – {property?.location?.mapLink}
        </div>
        <div className='p-2'>
        <iframe src={property?.location?.mapLink} width="200" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        </div>
        
    </div>
  )
}

export default Overview