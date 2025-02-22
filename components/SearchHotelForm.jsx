'use client'
import React, { useState } from 'react'
import {DatePickerWithRange} from './ui/dateRangePicker'
import { Input } from "@/components/ui/input"
import { addDays } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SearchIcon } from 'lucide-react'


function SearchHotelForm() {

  const [date, setDate] = React.useState({
    // from: new Date(),
    // to: addDays(new Date(), 20),
  })
  const [location, setLocation] = useState("");
  // 
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [room, setRoom] = useState(1);
  // 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', { location, date });
  }
  return (
    // <div className='w-full mx-auto absolute bottom-[-50px] '>
    <div className='w-full'>
        <form onSubmit={handleSubmit} className='flex justify-center gap-2 rounded-xl w-5/6 mx-auto p-5 shadow-lg border  bg-white'>
           <div className='flex flex-col'>
            <Input type="text" className="border border-primary" placeholder="Where are you going ?" onChange={(e)=>setLocation(e.target.value)}/>
           </div>

           <div className='flex flex-col'>
            <DatePickerWithRange  date={date} setDate={setDate} />
           </div>

           <Popover>
            <PopoverTrigger>
            <div className='flex flex-col'>
            <div className='flex  h-9 w-full rounded-md border border-primary border-input bg-transparent px-3 py-1 text-base shadow-sm'> 
              {adult}&nbsp; <small>Adults</small> &nbsp;.&nbsp;{child}&nbsp; <small>Children</small>&nbsp;.&nbsp;{room}&nbsp; <small>Rooms</small>
            </div>
           </div>

            </PopoverTrigger>
            <PopoverContent>
              <div class="flex justify-between items-center">
                <div>Adults</div>
                <div className=' w-1/3 flex justify-center'>
                  <button onClick={() => setAdult(adult > 1 ? adult - 1 : adult)} className='bg-black text-white px-3 py-1 rounded-lg'>-</button>
                  <div className='px-3 py-1'>{adult}</div>
                  <button onClick={() => setAdult(adult + 1)} className='bg-black text-white px-3 py-1 rounded-lg'>+</button>
                </div>
              </div>
<hr />
              <div class="flex justify-between items-center mt-2">
                <div>Children</div>
                <div className=' w-1/3 flex justify-center'>
                  <button onClick={() => setChild(child>1 ? child - 1 : child)} className='bg-black text-white px-3 py-1 rounded-lg'>-</button>
                  <div className='px-3 py-1'>{child}</div>
                  <button onClick={() => setChild(child + 1)} className='bg-black text-white px-3 py-1 rounded-lg'>+</button>
                </div>
              </div>
<hr />
              <div class="flex justify-between items-center mt-2">
                <div>Rooms</div>
                <div className=' w-1/3 flex justify-center'>
                  <button onClick={() => setRoom(room>2 ? room - 1 : room)} className='bg-black text-white px-3 py-1 rounded-lg'>-</button>
                  <div className='px-3 py-1'>{room}</div>
                  <button onClick={() => setRoom(room + 1)} className='bg-black text-white px-3 py-1 rounded-lg'>+</button>
                </div>
              </div>

            </PopoverContent>
          </Popover>

           
           <button type="submit" className='bg-primary px-10 text-white rounded-lg'>
           <SearchIcon className='inline '/> Search
          </button>
        </form>
    </div>
  )
}

export default SearchHotelForm