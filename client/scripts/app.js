// YOUR CODE HERE:
var rooms = {};
var user = {
  // name: name,
  // friends: []
};


var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() { app.fetch(); },
  send: function( message ) { post(message); },
  fetch: function() { get(); },
  addMessage: function( message ) { $('#chats').append( toHTML( message, 'chat' ) ) },
  clearMessages: function() { $('#chats').empty() },
  addRoom: function( roomName ) { $('#roomSelect').append( toHTML( roomName, 'room' ) ) },
};


var post = function(message){
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

var get = function(){

  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
      console.log(data);
      parseRooms(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to receive message');
    }
  });

};

var toHTML = function(str, cssClass){
  //deal with escaping
  return "<div class=" + cssClass + ">" + str + "</div>";
}


var addRooms = function(rooms){
  _.each(rooms, function(room){
    app.addRoom(room);
  });
};

var parseRooms = function(response){
  var data = response.results;
  _.each(data, function(datum){
      rooms[datum.roomname] = datum.roomname;
  });

  addRooms(rooms);
};





// var parseMessages = function(response){

// }


app.init();









//Populate list of rooms
//Need to provide place to select room
//Click on room
//Display all messages in the selected room
//All messages have username and message (and room)
//Need to keep list of friends
//Need to bold class messages from friends
//Need place to post new messages
//
//Need to regularly update messages
//


//Option one:
//parseMessages provides list of rooms
//gives us messages for each room
//associates username for each message
//
//
//Option two:
//parseroom function, parsemessage function




