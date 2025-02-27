import { connectToDB } from "@/lib/db";
import RoomImageModel from "@/models/RoomImageModel";
import RoomModel from "@/models/RoomModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const room_id = searchParams.get("room_id");
    console.log(room_id)
    try {
      await connectToDB();
    
      const room = await RoomModel.find({ _id: room_id })
    //   const images = await RoomImageModel.find({ roomId: room_id })
    // console.log(room)
      return NextResponse.json({room});
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }