import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

function uuid() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
		(+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
	);
}
const mockDBData = [
	{
		senderId: 's-1',
		receiverId: 'r-1',
		id: uuid(),
		amount: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		senderId: 's-2',
		receiverId: 'r-2',
		id: uuid(),
		amount: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		senderId: 's-3',
		receiverId: 'r-3',
		id: uuid(),
		amount: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		senderId: 's-4',
		receiverId: 'r-4',
		id: uuid(),
		amount: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	}
]

async function main() {
	const settlementData = await prisma.settlement.createMany({
		data: mockDBData
	})
	console.log('seed')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })