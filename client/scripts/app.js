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
  fetch: function() { get( parseRooms ); },
  addMessage: function( message ) { $('#chats').append( message ) },
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

var get = function(fn, room){

  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
      console.log(data);
      fn(data, room);
    },
    error: function (data) {
      console.error('chatterbox: Failed to receive message');
    }
  });
};

var toHTML = function(str, cssClass){
  //deal with escaping
  if(str){
    var lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g;
    str = str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
    return "<div class=" + cssClass + ">" + str + "</div>";
  }
}

//Populate list of rooms

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


//Display all messages in the selected room
//All messages have username and message (and room)

var parseMessages = function(response, room){
  var data = response.results;
  console.log("parsethis", this)
  _.each(data, function(datum){
    if(datum.roomname === room){
      createMessage(datum.text, datum.username);
    }
  });
}

var createMessage = function( message, username ){
  var $div = '<div class="message">' + toHTML(username, 'username') + toHTML(message, 'chat') + "</div>";
  app.addMessage($div);
}


app.init();



//Click on room
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




