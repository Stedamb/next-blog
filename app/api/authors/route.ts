import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authors = await client.fetch(
      `*[_type == "author" && defined(slug.current)] | order(name asc) {
        name,
        slug
      }`
    );
    return NextResponse.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    return new NextResponse('Error fetching authors', { status: 500 });
  }
}
