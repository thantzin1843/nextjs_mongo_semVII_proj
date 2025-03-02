'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const params = useParams();
    const userId = params.user_id;
    const [rooms , setRooms] = useState([]);

    const fetchFavourites = async () => {
        const res = await fetch(`/api/user/favourites?user_id=${userId}`);
        const data = await res.json();
        console.log(data)
        setRooms(data);
    }

    useEffect(()=>{
        fetchFavourites();
    },[])

    const handleRemove = async(roomId,userId) =>{
        try {
            const response = await fetch('/api/user/favourites', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ roomId, userId }),
            });
        
            const data = await response.json();
        
            if (response.ok) {
              fetchFavourites()
            } else {
              alert(data.error); // Display error message
            }
          } catch (error) {
            console.error('Failed to remove favorite:', error);
            alert('Failed to remove favorite. Please try again.');
          }
    }
  return (
    <div className='flex gap-3 flex-wrap justify-center mt-5'>
        {
            rooms.map((room,index)=>(
                <div className="w-1/4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 bg-white" key={index}>
                {/* Room Name and Type */}
                <h2 className="text-xl font-semibold text-gray-800">
                  {room?.roomId?.name} - {room?.roomId?.type}
                </h2>
          
                {/* Description */}
                <p className="text-sm text-gray-600 mt-2">
                  {room?.description}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas neque modi provident corrupti recusandae repudiandae non distinctio in. Labore molestiae illum suscipit incidunt numquam commodi quo est iure eveniet veniam.
                </p>
          
                {/* Room Details */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Rooms:</span>
                    <span className="ml-2">{room?.roomId?.no_of_rooms}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Guests:</span>
                    <span className="ml-2">{room?.roomId?.no_of_guests}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Price:</span>
                    <span className="ml-2">${room?.roomId?.price} per night</span>
                  </div>
                </div>
          
                {/* Amenities */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-800">Amenities</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {room?.roomId?.amenities?.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-800">Food</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {room?.roomId?.food?.map((f, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-800">Outdoor and views</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {room?.roomId?.outdoor_and_view?.map((f, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
          
                {/* Additional Details */}
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="font-medium">Smoking:</span>
                    <span className="ml-2">{room?.roomId?.smoking ? "Allowed" : "Not Allowed"}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Private Bathroom:</span>
                    <span className="ml-2">{room?.roomId?.private_bathroom ? "Yes" : "No"}</span>
                  </div>
                </div>
          
                {/* Book Now Button */}
                <button onClick={()=>handleRemove(room?.roomId?._id,userId)} className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300">
                  Remove from Favourites
                </button>
              </div>
            ))
        }
    </div>
  )
}

export default page