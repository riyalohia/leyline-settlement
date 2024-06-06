"use client"

import React, { useEffect, useState } from "react";
import { Button, message } from '@/antd';
import { receiverId, senderId } from "@/mock";
import { fetchApi } from "@/util/api";
import { Amount, Settlement, Status } from "@/types";
import Typography from "./Typography";
import { SOCKET_AMOUNT_REFRESH, getStatus } from "@/util";
import { useSocket } from "./SocketProvider";

export default function Receiver({ settlement }: { settlement: Settlement }) {
	const [amount, setAmount] = useState(settlement.amount)
	const [isAccepted, setIsAccepted] = useState(settlement.status === Status.ACCEPTED)

	const [messageApi, contextHolder] = message.useMessage();
	const { socket, isConnected } = useSocket()

	useEffect(() => {
		if (socket && isConnected) {
			socket.on(SOCKET_AMOUNT_REFRESH, (data: Amount) => {
				setAmount(data.amount)
				messageApi.info(`Settlement Amount is updated`);
			})
		}
	}, [socket, isConnected]);


	const onSubmit = async (status: Status) => {
		await fetchApi('api/status', {
			method: 'POST',
			body: JSON.stringify({
				senderId: senderId,
				receiverId: receiverId,
				status
			})
		})
		if (status === Status.ACCEPTED) setIsAccepted(true)
		messageApi.info(`Settlement ${getStatus(status).toLowerCase()}`);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			{contextHolder}
			<div className="card flex flex-col justify-between p-4">
				<div>
					<Typography className="lg:text-2xl mb-2">
						Settlement Amount
					</Typography>
					<p className="lg:text-xl">
						$ {amount}
					</p>
				</div>
				<div className="flex gap-2 items-center justify-center w-100">
					<Button type="default" size="large" onClick={() => onSubmit(Status.REJECTED)} disabled={isAccepted}>
						Reject
					</Button>
					<Button type="primary" size="large" onClick={() => onSubmit(Status.ACCEPTED)} disabled={isAccepted}>
						Accept
					</Button>
				</div>
			</div>
		</div>
	)
}
