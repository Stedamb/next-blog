import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await client.fetch(
      `*[_type == "category" && defined(slug.current)] | order(title asc) {
        title,
        slug
      }`
    );
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new NextResponse('Error fetching categories', { status: 500 });
  }
}
