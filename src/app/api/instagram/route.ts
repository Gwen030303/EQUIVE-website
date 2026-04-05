import { NextResponse } from "next/server";
import { getInstagramPosts } from "@/lib/instagram";

export async function GET() {
  const posts = await getInstagramPosts(6);
  return NextResponse.json(posts);
}
