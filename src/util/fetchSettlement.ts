import { fetchApi } from "./api";

export async function fetchSettlement(senderId: string, receiverId: string) {
	return await fetchApi(`${process.env.SERVER_URL}api/settle?senderId=${senderId}&receiverId=${receiverId}`)
}