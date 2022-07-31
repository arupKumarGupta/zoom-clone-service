class UserService {
	constructor() {
		this.users = {};
	}
	getAllUsers() {
		return this.users;
	}

	addUser = ({ id, name }, roomId) => {
		this.users[roomId] = [
			...(this.users[roomId] ?? []),
			{ id, name, roomId },
		];
	};

	removeUser = (roomId, id) => {
		if (!this.users[roomId]) {
			return false;
		}

		this.users[roomId] = this.users[roomId].filter(
			(user) => user.id !== id
		);
		return true;
	};

	getRoomUsers = (roomId) => this.users[roomId] ?? [];
}

const userService = new UserService();
module.exports = userService;
