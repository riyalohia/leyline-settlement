# Settlement System

The project involves implementing a settlement process between two parties, Party A and Party B. The system handle iterative negotiation of settlement amounts by Party A, along with approvals or objections from Party B. The system ensures that all changes and responses are reflected on Party A's and Party B's interface.

### Technologies Used
- NextJS 14
- TypeScript
- Prisma
- SQLite
- Socket.io
- Tailwind

### To-do
1. Currently, party information such as IDs is mocked. We can implement sign-in/sign-out functionality for parties, save their information in cookies, and use these cookies as party IDs.

2. Currently, the project considers only two parties. However, we can accommodate multiple parties. For example, the receiver can have multiple senders, or vice versa.

3. Currently, `Socket.io` is used to enable automatic updates on the receiver's interface. Currently, When the amount is updated on the sender's interface, this event is broadcasted to all connections. As the project expands, we can send messages to individual receivers. This can be done as follows:

    - Maintain a list of all connected sockets. Each item in the list will look something like this:

        ```js
        {
            socketId, // Socket connection Id
            userId // User info generated during signin/signup
        }
        ```
    - Since the sender will have information about the receiver while emitting the amount update event, it can emit the event with the receiverId information:
        ```js
        socket.emit(SOCKET_AMOUNT_UPDATE, { amount, receiverId }, () => {
			console.log('Amount Updated')
		})
        ```
    - Once we receive the above event on the server, we can extract the receiver's socket ID from the connected sockets list maintained in step 1, and then emit the update event to the particular receiver:
        ```js
        socket.to(receiverSocketId).emit(SOCKET_AMOUNT_REFRESH, { amount: data.amount })
        ```
