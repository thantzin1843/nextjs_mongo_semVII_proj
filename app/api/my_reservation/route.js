import { connectToDB } from "@/lib/db";
import Reservation from "@/models/ReservationModel";
import { NextResponse } from "next/server";

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