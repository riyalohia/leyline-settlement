import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { serialize } from 'v8';

const prisma = new PrismaClient();

// API to update the status of settlement
export async function POST(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
	}
	
	try {
		// @ts-ignore
		const body = await req.json()
		const { receiverId, status, senderId } = body;
		const settlement = await prisma.settlement.update({
			where: {
				senderId,
				receiverId,
			},
			data: {
				status,
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

// API to get the settlement status
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
		return NextResponse.json(settlementInfo?.status, { status: 200 })
	} catch (err) {
		return NextResponse.json({ message: 'Something went wrong', err }, { status: 400 })
	}
};