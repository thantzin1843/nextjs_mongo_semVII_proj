

import { Cat, CreditCard, LogIn, LogOut, PersonStanding } from 'lucide-react'
import React from 'react'

function HouseRules({property}) {
  return (
    <div className="mt-5">
        <div className='text-2xl '>
          House Rules
        </div>
        <div className='p-3 rounded-lg shadow-md border border-gray-300'>
          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><LogIn className='me-2 inline '/> Check-in</div>
            <div className="w-2/3">From {property?.checkin?.from} - Until {property?.checkin?.until}</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><LogOut className='me-2 inline '/> Check-out</div>
            <div className="w-2/3">From {property?.checkout?.from} - Until {property?.checkout?.until}</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><PersonStanding className='me-2 inline '/>Children</div>
            <div className="w-2/3">{property?.house_rules?.children_allowed ? <span>Children of all ages are welcome.</span> : <span className='text-red-500'>Children are not allowed</span>}</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><PersonStanding className='me-2 inline '/>Age Restriction</div>
            <div className="w-2/3">{property?.house_rules?.age_restriction }</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><Cat className='me-2 inline '/>Pet</div>
            <div className="w-2/3">{property?.house_rules?.pet_allowed ? <span>Pet are allowed.</span> : <span className='text-red-500'>Pet are not allowed.</span>}</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><CreditCard className='me-2 inline '/>Acceptance Payments</div>
            <div className="w-2/3">
            {
              property?.payments?.map((payment, index)=>(
                <div key={index} className="flex gap-2 text-md border p-1 my-1">{payment}</div>
              ))
            }
            </div>
          </div>
        </div>
    </div>
  )
}

export default HouseRules