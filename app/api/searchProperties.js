// pages/api/searchProperties.js


import moment from "moment"; // To handle date comparisons
import { connectToDB } from "@/lib/db";
import PropertyModel from "@/models/PropertyModel";

export default async function handler(req, res) {
    const { location, checkin, checkout, no_of_guests } = req.query;

    try {
        await connectToDB(); 

        // Parse check-in and check-out dates
        const checkInDate = moment(checkin);
        const checkOutDate = moment(checkout);

        // Search for properties based on location
        const properties = await PropertyModel.find({
            "location.city": location.city,
            "location.country": location.country,
            // Additional filters can be added for other location fields
        }).populate('rooms');

        // Filter rooms based on availability, guest count, and dates
        let availableProperties = [];

        for (let property of properties) {
            for (let room of property.rooms) {
                // Check if room is available during the specified dates and for the correct number of guests
                let isAvailable = true;
                for (let roomDate of room.available_dates) {
                    if (moment(roomDate).isBetween(checkInDate, checkOutDate, null, '[]')) {
                        isAvailable = false;
                        break;
                    }
                }

                // Check guest capacity
                if (room.no_of_guests < no_of_guests) {
                    isAvailable = false;
                }

                if (isAvailable) {
                    availableProperties.push({
                        property,
                        room,
                    });
                }
            }
        }
        console.log("Available properties:", availableProperties);

        res.status(200).json({ availableProperties });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
