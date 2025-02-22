import { connectToDB } from "@/lib/db";
import RoomModel from "@/models/RoomModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB() // Ensure DB connection

    const formData = await req.json(); // Get form data from request body
    console.log(formData);
    // Create a new hotel document
    const result = await RoomModel.create(formData);
    console.log(result);
    const roomId = result._id;
    console.log('Room ID:', roomId);

    return NextResponse.json({ success: true, message: "Room created successfully!",roomId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error saving hotel", error: error.message }, { status: 500 });
  }
}

