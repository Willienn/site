import { NextResponse, NextRequest } from "next/server";

const images: Array<number> = [];

export async function GET(request: NextRequest) {
  if (!request.url) return NextResponse.json({}, { status: 200 });
  images.push(Math.random());
  return NextResponse.json({ images }, { status: 200 });
}
