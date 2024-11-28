import { fetchJokes } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const term = await req.json();
    console.log(term, "term in jokes");
    const jokes = await fetchJokes('dad');
    // console.log(jokes, "jokes i get");

    return NextResponse.json({ result: jokes, success: true });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "fail to search joke",
    });
  }
}



