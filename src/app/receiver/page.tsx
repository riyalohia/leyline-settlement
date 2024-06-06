import React from "react";
import { fetchSettlement } from "@/util/fetchSettlement";
import { receiverId, senderId } from "@/mock";
import Receiver from "@/components/Receiver";

export default async function ReceiverPage() {
	const settlement = await fetchSettlement(senderId, receiverId)
	return <Receiver settlement={settlement}/>
}
