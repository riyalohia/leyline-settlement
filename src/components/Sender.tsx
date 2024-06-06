"use client"

import React, { ChangeEvent, useState } from "react";
import { Button, Input, Modal, Tag } from '@/antd';
import { receiverId, senderId } from "@/mock";
import { fetchApi } from "@/util/api";
import { Settlement, Status } from "@/types";
import Typography from "./Typography";
import { fetchSettlement } from "@/util/fetchSettlement";
import { SOCKET_AMOUNT_REFRESH, SOCKET_AMOUNT_UPDATE, getStatus } from "@/util";
import { EditOutlined } from "@ant-design/icons";
import { fetchSettlementStatus } from "@/util/fetchSettlementStatus";
import { useSocket } from "./SocketProvider";

const getColor = (status: Status) => {
	if (status === Status.REJECTED) return 'error'
	if (status === Status.ACCEPTED) return 'success'

	return 'processing'
}

export default function Sender({ settlement }: { settlement: Settlement }) {
	const [settlementData, setSettlementData] = useState(settlement)
	const [amount, setAmount] = useState(settlementData?.amount)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditable, setIsEditable] = useState(false)

	const { socket, isConnected } = useSocket()

	const isStatusAccepted = settlementData?.status === Status.ACCEPTED
	const showInput = !isStatusAccepted && (isEditable || !settlementData?.amount)

	const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(Number(e.target.value))
	}

	// Emit the amount update information to receiver
	function emitAmoutChange() {
		if (socket && isConnected) {
			socket.emit(SOCKET_AMOUNT_UPDATE, { amount }, () => {
				console.log('Amount Updated')
			})
		}
	}

	async function onSubmit(e: any) {
		e.preventDefault()

		const updatedStatus = await fetchSettlementStatus(senderId, receiverId)
		if (updatedStatus !== Status.ACCEPTED) {
			await fetchApi('api/settle', {
				method: 'POST',
				body: JSON.stringify({
					id: senderId,
					receiverId: receiverId,
					amount
				})
			})
			emitAmoutChange()
			setIsEditable(false)
		} else {
			setIsModalOpen(true)
		}
	}

	const editAmount = () => {
		if (isStatusAccepted) return
		setIsEditable(true)
	}

	const onConfirm = async () => {
		const updatedSettlement = await fetchSettlement(senderId, receiverId)
		setSettlementData(updatedSettlement)
		setIsModalOpen(false)
		setAmount(updatedSettlement?.amount)
	}

	const onCloseModal = () => setIsModalOpen(false)

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="card flex flex-col justify-between p-4">
				<div>
					<Typography className="lg:text-xl mb-2">
						Current Status
					</Typography>
					<Tag color={getColor(settlementData.status)}>{getStatus(settlementData.status)}</Tag>
				</div>
				<div>
					<Typography className="lg:text-xl mb-2">
						Settlement Amount
					</Typography>
					<Input
						className="h-10"
						prefix="$"
						onChange={onChangeAmount}
						width={'300px'}
						value={amount}
						disabled={isStatusAccepted}
						style={{ display: showInput ? '' : 'none' }}
					/>
					{!showInput && (
						<div className="flex gap-3">
							<p>
								$ {amount}
							</p>
							{!isStatusAccepted && <EditOutlined onClick={editAmount} />}
						</div>
					)}
				</div>
				<div className="flex gap-2 items-center justify-center w-100">
					<Button type="primary" size="large" onClick={onSubmit} disabled={isStatusAccepted}>
						Submit
					</Button>
				</div>
			</div>
			<Modal title="Settlement Status Updated" open={isModalOpen} onOk={onConfirm} onCancel={onCloseModal} onClose={onCloseModal}>
				<p>Your settlement status is updated. Please click on OK to see the latest status.</p>
			</Modal>
		</div>
	)
}
