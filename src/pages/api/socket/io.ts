import { SOCKET_AMOUNT_REFRESH, SOCKET_AMOUNT_UPDATE, SOCKET_HANDSHAKE } from '@/util'
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

		const sockets: { [key: string]: string } = {};

		io.on("connection", function (socket) {
			socket.on(SOCKET_HANDSHAKE, ({ socketId, userId }) => {
				if (!sockets.socketId) {
					sockets[socketId] = userId
				}
			})

			socket.on(SOCKET_AMOUNT_UPDATE, ({ amount }) => {
				console.log('Settlement Amount Updated')
				socket.broadcast.emit(SOCKET_AMOUNT_REFRESH, { amount })
			})

			socket.on('disconnect', () => {
				delete sockets[socket.id]
			});

		})
	}
	res.end()
}

export default ioHandler