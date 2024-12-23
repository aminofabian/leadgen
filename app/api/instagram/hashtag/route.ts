import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic'; // This makes the route fully dynamic

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hashtag = searchParams.get('hashtag');

    if (!hashtag) {
      return NextResponse.json(
        { error: "Hashtag parameter is required" },
        { status: 400 }
      );
    }

    const headersList = headers();
    const cookie = headersList.get('cookie');

    const response = await fetch(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1&__d=dis`, {
      headers: {
        'Cookie': cookie || '',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Instagram API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Instagram API Error:', error);
    return NextResponse.json(
      { error: "Failed to fetch hashtag data" },
      { status: 500 }
    );
  }
}
