const {
	CONNECTION,
	JOIN_ROOM,
	USER_CONNECTED,
	GET_ROOM_USERS,
	USER_DISCONNECTED,
} = require('./contants/socket-events');
const uuid4 = require('uuid4');
const userService = require('./services/UserService');

module.exports = function (io) {
	io.on(CONNECTION, (socket) => {
		console.log('connection received', socket.id);
		// when new user joins the meeting
		socket.on(JOIN_ROOM, ({ roomId, name }) => {
			// if no room id generate a uuid4 room id -- roomId null means create a new room
			const meetingRoomId = roomId?.length ? roomId : uuid4();
			console.log(`joined room ${meetingRoomId}`);
			console.log(`name: ${name}`);
			socket.join(meetingRoomId);

			// broadcast to all members of the room except self
			socket.to(meetingRoomId).emit(USER_CONNECTED, name);
			userService.addUser({ id: socket.id, name }, meetingRoomId);

			// broadcast to everyone in the room including self
			io.to(meetingRoomId).emit(
				GET_ROOM_USERS,
				userService.getRoomUsers(meetingRoomId)
			);

			// when the user disconnects
			socket.on(USER_DISCONNECTED, () => {
				console.log('disconnected', socket.id);
				socket.leave(meetingRoomId);
				userService.removeUser(meetingRoomId, socket.id);

				// broadcast to every one including self
				io.emit(
					GET_ROOM_USERS,
					userService.getRoomUsers(meetingRoomId)
				);
			});
		});
	});
};
