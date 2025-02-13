import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
	// Ensure SSL verification is disabled
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	try {
		return NextResponse.json(await listInvoices());
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
  }