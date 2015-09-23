app.controller('MainCtrl', function($scope, socket) {


	$scope.notes = [];
	socket.listNotes($scope);
	

	// Incoming
	socket.on('onNoteCreated', function(data) {
		$scope.notes.push(data);

	});

	socket.on('onNoteDeleted', function(data) {
		$scope.handleDeletedNoted(data.id);
	});


	// Outgoing
	$scope.createNote = function() {
		var note = {
			id: new Date().getTime(),
			title: 'Nueva nota',
			body: 'Pendiente',
			x: 10,
			y: 50
		};

		$scope.notes.push(note);
		socket.emit('createNote', note);
	};

/*	 $scope.alerta = function () {
	 	
	 	var note = {
			id: new Date().getTime(),
			title: 'New Note',
			body: 'Pending'
		};

	 	socket.emit('alerta',note);
	 	console.log("entre al alert");
	 }*/


	$scope.deleteNote = function(id) {
		$scope.handleDeletedNoted(id);

		socket.emit('deleteNote', {id: id});
	};

	$scope.handleDeletedNoted = function(id) {
		var oldNotes = $scope.notes,
		newNotes = [];

		angular.forEach(oldNotes, function(note) {
			if(note.id !== id) newNotes.push(note);
		});

		$scope.notes = newNotes;
	}
});