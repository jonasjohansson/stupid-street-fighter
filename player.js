const socket = io();

const form = document.querySelector('form');
const command = form.querySelector('input[type=text]');
const submit = form.querySelector('input[type=submit]');

const playerId = Math.floor(Math.random() * 2);

form.addEventListener('submit', () => {
	event.preventDefault();
});

submit.addEventListener('click', () => {
	socket.emit('playerCommand', {player: playerId, val: command.value});
});

window.ondevicemotion = function (e) {
	socket.emit('playerRotation', {player: playerId, val: e.accelerationIncludingGravity.x});
};

if (annyang) {
	const commands = {
		up() {
			socket.emit('playerCommand', {player: playerId, val: 'up'});
		},
		down() {
			socket.emit('playerCommand', {player: playerId, val: 'down'});
		},
		combo() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		gumbo() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		columbo() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		humble() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		cardinal() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		cardinals() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		condo() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		condell() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		chromebook() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		kindle() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		kendo() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		},
		kimbo() {
			socket.emit('playerCommand', {player: playerId, val: 'combo'});
		}
	};
	annyang.addCommands(commands);
	annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
		console.log(userSaid);
		console.log(commandText);
		console.log(phrases);
	});
	annyang.start();
}
