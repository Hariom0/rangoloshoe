import dbconnect from "@/lib/db";
import Footware from "@/models/Footware";
import { NextResponse } from "next/server";

export async function GET() {
	await dbconnect();

	try {
		let [freshDrops, bestSellers , total] = await Promise.all([Footware.countDocuments({ is_fresh_drop: true }), Footware.countDocuments({ is_bestseller: true }) , Footware.countDocuments()]);

		return NextResponse.json({freshDrops , bestSellers , total});
	} catch (error) {
		console.error("Database fetch error:", error);
		// FIX: Added return statement and a 500 status code
		return NextResponse.json({ msg: "Failed to fetch data" }, { status: 500 });
	}
}
