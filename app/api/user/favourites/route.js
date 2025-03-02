import { NextResponse } from 'next/server';

import { connectToDB } from '@/lib/db';
import Favorite from '@/models/FavRoomModel';
import RoomModel from '@/models/RoomModel';
import RoomImageModel from '@/models/RoomImageModel';

// Connect to the database

export async function GET(request) {
    try {
      await connectToDB();
      const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required.' },
        { status: 400 }
      );
    }

    // Fetch favorites for the user and populate the room details
    const favorites = await Favorite.find({ userId, fav: true })
    .populate('roomId') // Populate the room details
    .exec();

  
    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch favorites', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
    try {
        await connectToDB();
      const { roomId, userId } = await request.json();
  
      // Validate input
      if (!roomId || !userId) {
        return NextResponse.json(
          { error: 'Both roomId and userId are required.' },
          { status: 400 }
        );
      }
  
      // Remove the favorite
      const result = await Favorite.findOneAndDelete({ roomId, userId });
  
      if (!result) {
        return NextResponse.json(
          { error: 'Favorite not found.' },
          { status: 404 }
        );
      }
  
      // Return success response
      return NextResponse.json(
        { message: 'Room removed from favorites.' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to remove favorite.', details: error.message },
        { status: 500 }
      );
    }
  }