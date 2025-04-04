'use client'
import React, { useEffect, useState } from 'react'
import {DatePickerWithRange} from './ui/dateRangePicker'
import { Input } from "@/components/ui/input"
import { addDays } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SearchIcon } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearchFormContext } from '@/context/SearchContext'
import { southeastAsiaCities } from '@/context/data'


function SearchHotelForm() {
  const {updateSearchFormData} = useSearchFormContext();
  const [date, setDate] = useState( {});
  const [location, setLocation] = useState("");
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [pet,setPet] = useState(false);


  const router = useRouter();

  // modify features 
  const [suggestions, setSuggestions] = useState([]);

  // Mock API call to fetch location suggestions
  const fetchSuggestions = async (query) => {
    // Replace this with a real API call (e.g., Google Places API)


    // Filter suggestions based on the query
    const filteredSuggestions = southeastAsiaCities.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]); // Clear suggestions
  };
  //modify features end

  const handleSearch = () => {
    const checkin = new Date(date.from)
    const checkout = new Date(date.to)
    const no_of_guests = adult + child;

    const queryParams = new URLSearchParams({
      location,from:checkin,to:checkout,no_of_guests,pet
    }).toString();
    localStorage.setItem('checkin',checkin)
    localStorage.setItem('checkout',checkout)
    window.location.href = `/search?${queryParams}`;
    // router.push(`/search?${queryParams}`);

  }
  return (
    <div className='w-full mt-5 '>
        <div className='flex justify-center gap-2 rounded-xl w-5/6 mx-auto py-5 shadow-lg border  bg-white  border-primary'>
           <div className='flex flex-col w-1/4 relative'>
            <Input type="text" className="border border-primary " value={location} placeholder="Where are you going ?" onChange={handleInputChange}/>
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-primary mt-1 z-10 rounded-md">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
      )}
           </div>

           <div className='flex flex-col'>
            <DatePickerWithRange  date={date} setDate={setDate} />
           </div>

           <Popover>
            <PopoverTrigger>
            <div className='flex flex-col'>
            <div className='flex  h-9 w-full rounded-md border border-primary border-input bg-transparent px-3 py-1 text-base shadow-sm'> 
              {adult}&nbsp; <small>Adults</small> &nbsp;.&nbsp;{child}&nbsp; <small>Children</small>&nbsp;.&nbsp;1&nbsp; <small>Rooms</small>
            </div>
           </div>

            </PopoverTrigger>
            <PopoverContent>
              <div class="flex justify-between items-center py-1">
                <div>Adults</div>
                <div className=' w-1/3 flex justify-center'>
                  <button onClick={() => setAdult(adult > 1 ? adult - 1 : adult)} className='bg-black text-white px-3 py-1 rounded-lg'>-</button>
                  <div className='px-3 py-1'>{adult}</div>
                  <button onClick={() => setAdult(adult + 1)} className='bg-black text-white px-3 py-1 rounded-lg'>+</button>
                </div>
              </div>
<hr />
              <div class="flex justify-between items-center mt-2 py-1">
                <div>Children</div>
                <div className=' w-1/3 flex justify-center'>
                  <button onClick={() => setChild(child>1 ? child - 1 : child)} className='bg-black text-white px-3 py-1 rounded-lg'>-</button>
                  <div className='px-3 py-1'>{child}</div>
                  <button onClick={() => setChild(child + 1)} className='bg-black text-white px-3 py-1 rounded-lg'>+</button>
                </div>
              </div>
<hr />
             

              <div class="flex justify-between items-center mt-2">
                <div><Checkbox onClick={()=>setPet(!pet)}/> Allowed pet?</div>
              </div>

            </PopoverContent>
          </Popover>

           
           <button className='bg-primary px-10 text-white rounded-lg' onClick={handleSearch}>
           <SearchIcon className='inline' /> Search
          </button>
        </div>
    </div>
  )
}

export default SearchHotelForm