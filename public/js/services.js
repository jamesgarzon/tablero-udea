app.factory('socket', function($rootScope,$http) {
	var socket = io.connect();
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		},
		 listNotes:function(scope){
            
            var $promise=$http.get('/notes'); 
            $promise.then(function(msg){
                scope.notes=msg.data;
               console.log(JSON.stringify(msg));    
            });
        }
	};
});