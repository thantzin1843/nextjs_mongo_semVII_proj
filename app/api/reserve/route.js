import { connectToDB } from "@/lib/db";
import PropertyModel from "@/models/PropertyModel";
import Reservation from "@/models/ReservationModel";
import RoomModel from "@/models/RoomModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB() // Ensure DB connection

    const loadData = await req.json(); // Get form data from request body
    console.log(loadData);
    await Reservation.create(loadData)
    console.log("Reservation created successfully");

    const room = await RoomModel.findById(loadData.roomId);
    if (!room) {
      return NextResponse.json(
        { success: false, message: 'Room not found' },
        { status: 404 }
      );
    }

    // Add the reservation details to the room's availability array
    room.availability.push({
      from: loadData.checkIn,
      to: loadData.checkOut,
      no_of_rooms_reserved: loadData.no_of_rooms_reserved,
    });

    // Save the updated room document
    await room.save();

    return NextResponse.json({ success: true, message: "You reserved successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error reserving room", error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDB(); // Ensure DB connection

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const properties = await PropertyModel.find({ userId });

    if (properties.length === 0) {
      return NextResponse.json(
        { message: 'No properties found for this user' },
        { status: 200 }
      );
    }

    // Extract property IDs
    const propertyIds = properties.map((property) => property._id);

    // Step 2: Fetch reservations for those properties
    const reservations = await Reservation.find({ property_id: { $in: propertyIds } })
      .populate('property_id') // Populate property details
      .populate('roomId') // Populate room details
      .exec();
      console.log(reservations)
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}