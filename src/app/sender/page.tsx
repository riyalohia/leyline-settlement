import React from "react";
import { receiverId, senderId } from "@/mock";
import { fetchApi } from "@/util/api";
import Sender from "@/components/Sender";
import { fetchSettlement } from "@/util/fetchSettlement";

export default async function SenderPage() {
	const settlement = await fetchSettlement(senderId, receiverId)
	return <Sender settlement={settlement}/>
}
