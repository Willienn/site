import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
) {
  if (!request.url) return NextResponse.json({}, { status: 200 });

  const url = new URL(request.url, `http://${request.headers?.host}`);
  const { searchParams } = url;
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "My default title";

  return NextResponse.json({ title, url }, { status: 200 });
}
