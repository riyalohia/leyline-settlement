import { Status } from "@/types";

export function uuid() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
		(+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
	);
}

export const getStatus = (status: Status) => {
	if (status === Status.ACCEPTED) return 'ACCEPTED'
	if (status === Status.REJECTED) return 'REJECTED'
	return 'PENDING'
}

export const SOCKET_AMOUNT_UPDATE = 'amount-update'
export const SOCKET_HANDSHAKE = 'handshake'
export const SOCKET_AMOUNT_REFRESH = 'amount-refresh'