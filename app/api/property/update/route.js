import { connectToDB } from "@/lib/db";
import PropertyModel from "@/models/PropertyModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB() // Ensure DB connection
    const formData = await req.json(); // Get form data from request body
    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      formData._id,
      formData,
      { new: true } // Return the updated document
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

      // Return success response
      return NextResponse.json({ success: true, message: "Property created successfully!" }, { status: 201 });
    } catch (error) {
      console.error("Error updating property:", error);
      return NextResponse.json({ success: false, message: "Error saving hotel", error: error.message }, { status: 500 });
    }

   
}

