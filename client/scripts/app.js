// YOUR CODE HERE:


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
      return data;
    },
    error: function (data) {
      console.error('chatterbox: Failed to receive message');
    }
  });
};

var toHTML = function(str, cssClass){
  //deal with escaping
  // str = "temporary";
  return "<div class=" + cssClass + ">" + str + "</div>";
}


var parseMessages = function(response){
  var total = response.results;

}

