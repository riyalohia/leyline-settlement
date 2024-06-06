export enum Status {
	PENDING,
	REJECTED,
	ACCEPTED
}

export interface Settlement {
  senderId: string
	receiverId: string
	amount: number
	status: Status
}

export interface Amount {
	amount: number
}