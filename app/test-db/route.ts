import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
	// Ensure SSL verification is disabled
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
  try {
    const result = await sql`SELECT 1 AS test;`;
    return NextResponse.json({ success: true, result: result.rows });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
