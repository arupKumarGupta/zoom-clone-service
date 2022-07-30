const express = require('express');
const app = express();

// create a serve with express
const server = require('http').Server(app);

const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
	res.json({
		working: true,
	});
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
