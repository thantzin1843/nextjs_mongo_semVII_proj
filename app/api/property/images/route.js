import { connectToDB } from "@/lib/db";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { fileId } = await request.json(); // Get fileId from request body
    console.log(fileId);
  if (!fileId) {
    return NextResponse.json({ error: "File fileId is required" });
  }

  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY, // Use environment variables
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
  });

  try {
    await imagekit.deleteFile(fileId);
    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST (request,res){
    try {
        await connectToDB();
        const images = await req.json();
        console.log(images);
    } catch (error) {
        
    }
}
