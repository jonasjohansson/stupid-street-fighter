'use strict';
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const robot = require('robotjs');
const cmd = require('node-cmd');

robot.setKeyboardDelay(40);

app.get('/', (req, res) => {
	res.sendFile('index.html', {root: __dirname});
});

app.use(express.static(__dirname + '/'));

const commands = new Map([
	['light kick',		['z', 'f']],
	['medium kick', 	['x', 'g']],
	['medium punch', 	['c', 'h']],
	['light punch',		['v', 'j']],
	['hard punch', 		['n', 'k']],
	['hard kick', 		['m', 'l']],
	['up', 				['up', 'w']],
	['down', 			['down', 's']],
	['left', 			['left', 'a']],
	['right', 			['right', 'd']],
	['combo', 			['q', 'e']]
]);

io.on('connection', socket => {
	socket.on('playerCommand', data => {
		console.log(data);
		for (const [key, value] of commands) {
			if (key === data.val) {
				cmd.run('open -a ZSNES');
				const command = value[data.player];
				pressKey(command);
				// cmd.run('open -a "Google Chrome"');
			}
		}
	});
	// socket.on('playerRotation', data => {
	// 	const tiltLeft = Boolean(data.val > -10 && data.val < -5);
	// 	const tiltRight = Boolean(data.val > 5 && data.val < 10);
	// 	if (data.player === 0) {
	// 		if (tiltLeft) {
	// 			pressKey('left');
	// 		} else if (tiltRight) {
	// 			pressKey('right');
	// 		}
	// 	} else if (tiltLeft) {
	// 		pressKey('left');
	// 	} else if (tiltRight) {
	// 		pressKey('right');
	// 	}
	// });
	socket.on('playerEmotion', data => {
		console.log(data);
		switch (data.val){
			case 'sad':
				if (data.player === 0){
					pressKey('right');
				} else {
					pressKey('d');
				}
			break;
			case 'surprised':
				if (data.player === 0){
					pressKey('left');
				} else {
					pressKey('a');
				}
			default:
			break;
		}
	});
});

function pressKey(key) {
	for (var i = 0; i < 8; i++) {
		robot.keyToggle(key, 'down');
	}
	for (var i = 0; i < 8; i++) {
		robot.keyToggle(key, 'up');
	}
}

server.listen(3000, () => {
	console.log('listening on *:3000');
});
