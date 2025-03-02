import { connectToDB } from "@/lib/db";
import Favorite from "@/models/FavRoomModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await connectToDB() // Ensure DB connection
  
      const loadData = await req.json(); // Get form data from request body

      const existingFavorite = await Favorite.findOne({ userId: loadData?.userId, roomId: loadData?.roomId });

      if (existingFavorite) {
        await Favorite.updateOne(
            { userId:loadData?.userId, roomId:loadData?.roomId }, // Query to find the favorite
            { $set: { fav: loadData?.fav } } // Update the `fav` field to `true`
          );
        return NextResponse.json(
          { message: 'Fav updated successfully' },
          { status: 400 }
        );
        // console.log(existingFavorite)
      }

      await Favorite.create(loadData)
      console.log("success save")
      return NextResponse.json({ success: true, message: "Fav is saved successfully!" }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, message: "Error Faving property", error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const roomId = searchParams.get('roomId');
      const userId = searchParams.get('userId');

  
      await connectToDB()
      // Validate input
      if (!roomId || !userId) {
        return NextResponse.json(
          { error: 'Both roomId and userId are required.' },
          { status: 400 }
        );
      }
  
      // Check if the favorite exists
      const favorite = await Favorite.findOne({ userId, roomId });
  
      // Return the favorite status
      return NextResponse.json({ isFav:favorite?.fav }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to check favorite status', details: error.message },
        { status: 500 }
      );
    }
  }