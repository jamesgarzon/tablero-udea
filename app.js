var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});

var notes = [];

io.sockets.on('connection', function(socket) {

	socket.on('createNote', function(data) {
		notes.push(data);
		socket.broadcast.emit('onNoteCreated', data);
	});

	socket.on('updateNote', function(data) {
		for (var i = notes.length - 1; i >= 0; i--) {
			if (notes[i].id==data.id) {
				notes[i].title = data.title;
				notes[i].body = data.body;
			}; 

		};
		socket.broadcast.emit('onNoteUpdated', data);
	});

	socket.on('moveNote', function(data){
		for (var i = notes.length - 1; i >= 0; i--) {
			if (notes[i].id==data.id) {
				notes[i].x = data.x;
				notes[i].y = data.y;
			}; 

		};
		console.log(JSON.stringify(notes));

		socket.broadcast.emit('onNoteMoved', data);
	});

	socket.on('deleteNote', function(data){
		for (var i = notes.length - 1; i >= 0; i--) {
			if (notes[i].id==data.id) {
				notes.splice(i, 1);
			}
		};
    	

		socket.broadcast.emit('onNoteDeleted', data);
	});

});

app.get('/notes', function (req, res) {
    'use strict';
    
    res.send(JSON.stringify(notes));
});
server.listen(1337);
