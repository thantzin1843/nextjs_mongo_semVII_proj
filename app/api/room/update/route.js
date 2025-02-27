import { connectToDB } from "@/lib/db";
import RoomModel from "@/models/RoomModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB() // Ensure DB connection
    const loadData = await req.json(); // Get form data from request body
    const updatedProperty = await RoomModel.findByIdAndUpdate(
      loadData._id,
      loadData,
      { new: true } // Return the updated document
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Room not found' });
    }

      // Return success response
      return NextResponse.json({ success: true, message: "Room updated successfully!" }, { status: 201 });
    } catch (error) {
      console.error("Error updating property:", error);
      return NextResponse.json({ success: false, message: "Error updating room", error: error.message }, { status: 500 });
    }

   
}

