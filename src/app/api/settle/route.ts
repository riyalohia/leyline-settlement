import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'

// API to update the settlement amount
export async function POST(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
	}

	try {
		// @ts-ignore
		const body = await req.json()
		const { id, amount, receiverId } = body;
		const settlement = await prisma.settlement.update({
			where: {
				senderId: id,
				receiverId,
			},
			data: {
				amount,
				updatedAt: new Date()
			}
		})
		if (!settlement) {
			return NextResponse.json({ message: 'Record Not Found' }, { status: 404 })
		}
		return NextResponse.json(settlement, { status: 200 })
	} catch (err) {
		return NextResponse.json({ message: 'Something went wrong', err }, { status: 400 })
	}
};

// API to get the settlement information
export async function GET(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
	}
	try {
		const url = new URL(req.url as string)
		const searchParams = new URLSearchParams(url.searchParams)
		// @ts-ignore
		const { receiverId, senderId } = searchParams
		const settlementInfo = await prisma.settlement.findFirst({
			where: {
				receiverId,
				senderId
			},
		});
		if (!settlementInfo) {
			return NextResponse.json({ message: 'Record Not Found' }, { status: 404 })
		}
		return NextResponse.json(settlementInfo, { status: 200 })
	} catch (err) {
		return NextResponse.json({ message: 'Something went wrong', err }, { status: 400 })
	}
};
