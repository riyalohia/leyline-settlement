
import { Amount } from '@/types'
import { SOCKET_AMOUNT_REFRESH, SOCKET_AMOUNT_UPDATE } from '@/util'
import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
// @ts-ignore
import SocketIO from 'socket.io'

export const config = {
	api: {
		bodyParser: false
	}
}

const ioHandler = (req: NextApiRequest, res: any) => {
	if (!res.socket.server.io) {
		const path = '/api/socket/io'
		const httpServer: NetServer = res.socket.server
		const io = SocketIO(httpServer, {
			path,
			pingTimeout: 60000,
			cors: {
				origin: process.env.SERVER_URL,
				methods: ["GET", "POST"]
			}
		})
		res.socket.server.io = io

		// @ts-ignore
		io.on("connection", function (socket) {

			socket.on(SOCKET_AMOUNT_UPDATE, (data: Amount) => {
				console.log('Settlement Amount Updated')

				/* For the current scope of the project, socket messages are broadcasted to all connected users 
				 because we are currently considering only two parties.
				 As the project expands, we should send messages to individual receivers.
				*/
				socket.broadcast.emit(SOCKET_AMOUNT_REFRESH, { amount: data.amount })
			})

			socket.on('disconnect', () => {
				console.log('Client Disconnected')
			});

		})
	}
	res.end()
}

export default ioHandler