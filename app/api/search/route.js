// pages/api/search.js
import { connectToDB } from '@/lib/db';
import PropertyImageModel from '@/models/PropertyImageModel';
import PropertyModel from '@/models/PropertyModel';
import RoomModel from '@/models/RoomModel';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const headers = new Headers();
  headers.set('Cache-Control', 'no-store, max-age=0');
  
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || '';
    const to = searchParams.get("to") || '';
    const location = searchParams.get('location'); // Filter by property location (city or country)
    const noOfGuests = searchParams.get('no_of_guests'); // Filter by room's no_of_guests
    const petAllowed = searchParams.get('pet');

    const categoryArray = searchParams.getAll('categories') ; // Filter by property categories (comma-separated list)
    const facilitiesArray = searchParams.getAll('facilities') ;

    if (!from || !to) {
      return NextResponse.json(
        { error: 'Please provide both "from" and "to" dates in the query parameters.' },
        { status: 400 }
      );
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const fromDate = formatDate(from);
    const toDate = formatDate(to);
    
    const rooms = await RoomModel.find().populate('property_id').exec();

    const availableRooms = rooms.map((room) => {
      let totalReservedRooms = 0;

      // Check if the requested dates overlap with any reserved dates
      room.availability.forEach((availability) => {
        const reservedFrom = new Date(availability.from);
        const reservedTo = new Date(availability.to);
        // Check for overlapping dates
        if (
          (fromDate < reservedTo && toDate > reservedFrom) || // Overlapping condition
          (fromDate >= reservedFrom && toDate <= reservedTo) // Requested range is within reserved range
        ) {
          totalReservedRooms += availability.no_of_rooms_reserved;
        }
      });

      // Calculate available rooms count
      const availableRoomsCount = room.no_of_rooms - totalReservedRooms;

      // Return the room with the available rooms count
      return {
        ...room.toObject(), // Convert Mongoose document to plain JavaScript object
        availableRoomsCount,
      };
    }).filter((room) => {
      // Apply filters
      const property = room.property_id;
      console.log("location in romm")
      console.log(property)
      if (location && !property.location.city.toLowerCase().includes(location.toLowerCase())) {

        return false;
      }

      // Filter by number of guests
      if (noOfGuests && room.no_of_guests < parseInt(noOfGuests)) {
        return false;
      }

      // Filter by pet_allowed
      if (JSON.parse(petAllowed)) {
        if(property.house_rules.pet_allowed === false){
          return false;
        } 
      }

      if (categoryArray.length > 0 && !categoryArray.includes(property.property_category)) {
        return false;
      }

      if (
        facilitiesArray.length > 0 &&
        !facilitiesArray.every((facility) => property.facilities.includes(facility))
      ) {
        return false;
      }



      // Filter out rooms with no available rooms
      return room.availableRoomsCount > 0;
    });

    // Filter out rooms with no available rooms
    const filteredAvailableRooms = availableRooms.filter(
      (room) => room.availableRoomsCount > 0
    );
    
    const propertyIds = filteredAvailableRooms.map((room) => room.property_id._id);
    const propertyImages = await PropertyImageModel.find({
      property_id: { $in: propertyIds },
    }).exec();
    const roomsWithImages = filteredAvailableRooms.map((room) => {
      const images = propertyImages.find(
        (image) => image.property_id.toString() === room.property_id._id.toString()
      );
      return {
        ...room,
        images: images ? images.images : [], // Add images to the room object
      };
    });
    console.log("Server result with images:");
    console.log(roomsWithImages);

    return NextResponse.json(roomsWithImages);
  } catch (error) {
      return NextResponse.json(error)
  }
}

// location=yangon&from=Sun+Dec+10+2023+00%3A00%3A00+GMT%2B0630+%28Myanmar+Time%29&to=Fri+Dec+15+2023+00%3A00%3A00+GMT%2B0630+%28Myanmar+Time%29&no_of_guests=3&pet=false
// location=yangon&from=Thu+Feb+13+2025+00%3A00%3A00+GMT%2B0630+%28Myanmar+Time%29&to=Sat+Feb+15+2025+00%3A00%3A00+GMT%2B0630+%28Myanmar+Time%29&no_of_guests=5&pet=false
// location=yangon&from=Wed+Mar+12+2025+00%3A00%3A00+GMT%2B0630+%28Myanmar+Time%29&to=Sat+Mar+15+2025+00%3A00%3A00+GMT%2B0630+%28Myanmar+Time%29&no_of_guests=9&pet_allowed=false