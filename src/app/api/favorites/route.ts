import pool from "@/libs/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
   
    const { id, joke, image_url } = await req.json();

    console.log("Received Joke: ", { id, joke, image_url }); 

    // Insert or update the joke with the image URL
    const [rows] = await pool.query(
      "INSERT INTO jokes (id, joke, image_url) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE joke = ?, image_url = ?",
      [id, joke, image_url, joke, image_url]
    );

    console.log("Database Rows Affected: ", rows); // Debugging output

    return NextResponse.json({
      success: true,
      message: "Favorite added successfully!",
    });
  } catch (error: any) {
    console.error("Error: ", error); // Log full error for debugging

    return NextResponse.json({
      success: false,
      error: error.message || "Error in adding favorite joke",
    });
  }
}
