import { fetchApi } from "./api";

export async function fetchSettlementStatus(senderId: string, receiverId: string) {
	return await fetchApi(`${process.env.SERVER_URL}/api/status?senderId=${senderId}&receiverId=${receiverId}`)
}