

import { Cat, CreditCard, LogIn, LogOut, PersonStanding } from 'lucide-react'
import React from 'react'

function HouseRules() {
  return (
    <div className="mt-5">
        <div className='text-2xl '>
          House Rules
        </div>
        <div className='p-3 rounded-lg shadow-md border border-gray-300'>
          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><LogIn className='me-2 inline '/> Check-in</div>
            <div className="w-2/3">From 9:00pm</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><LogOut className='me-2 inline '/> Check-out</div>
            <div className="w-2/3">to 9:00pm</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><PersonStanding className='me-2 inline '/>Children</div>
            <div className="w-2/3">Children of all ages are welcome.</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><PersonStanding className='me-2 inline '/>Age Restriction</div>
            <div className="w-2/3">Children of all ages are welcome.</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><Cat className='me-2 inline '/>Pet</div>
            <div className="w-2/3">Pet are allowed</div>
          </div>

          <div className='w-full flex p-3 border-b border-gray-300'>
            <div className="w-1/3 font-bold"><CreditCard className='me-2 inline '/>Acceptance Payments</div>
            <div className="w-2/3">Pet are allowed</div>
          </div>
        </div>
    </div>
  )
}

export default HouseRules