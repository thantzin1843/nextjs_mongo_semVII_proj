import { connectToDB } from "@/lib/db";
import Reservation from "@/models/ReservationModel";
import { NextResponse } from "next/server";
import RoomModel from "@/models/RoomModel";
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
      const reservations = await Reservation.find({ userId })
      .populate('property_id') // Populate property details
      .populate('roomId') // Populate room details
      .exec();

      return NextResponse.json(reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return NextResponse.json(
        { error: 'Internal Server Error', details: error.message },
        { status: 500 }
      );
    }
  }

export async function DELETE(req) {
        const body = await req.json();
        const { id, roomId, checkIn, checkOut, no_of_rooms_reserved } = body;

        console.log('Parsed body:', { id, roomId, checkIn, checkOut, no_of_rooms_reserved });

        if (!id || !roomId || !checkIn || !checkOut || !no_of_rooms_reserved) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    try {
        await connectToDB(); // Connect to MongoDB

        // Step 1: Delete the reservation
        await Reservation.findByIdAndDelete(id);

        // Step 2: Update the room's availability
        const room = await RoomModel.findById(roomId);
        if (!room) {
            return NextResponse.json({ message: 'Room not found' });
        }

        // Find the matching availability record
        const availabilityIndex = room.availability.findIndex(avail =>
            avail.from.toISOString() === new Date(checkIn).toISOString() &&
            avail.to.toISOString() === new Date(checkOut).toISOString() &&
            avail.no_of_rooms_reserved === no_of_rooms_reserved
        );

        if (availabilityIndex === -1) {
            return NextResponse.json({ message: 'Availability record not found' });
        }

        // Remove the matching availability record
        room.availability.splice(availabilityIndex, 1);

        // Save the updated room
        await room.save();
        console.log("Success cancel reservation");

        return NextResponse.json({ message: 'Reservation cancelled and availability updated successfully' });
    } catch (error) {
        console.error('Error cancelling reservation:', error);
        return NextResponse.json({ message: 'Server error' });
    }
}