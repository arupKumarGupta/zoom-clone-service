const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
// create a serve with express
const httpServer = require('http').createServer(app);
const userService = require('./services/UserService');
const io = require('socket.io')(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
	res.json({
		working: true,
	});
});

app.get('/users', (req, res) => {
	return res.json(userService.getAllUsers());
});

// all io related requests
require('./socket')(io);

httpServer.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
