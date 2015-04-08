
/////////////////////////////
///Backbone Implementation///
/////////////////////////////

var Message = Backbone.Model.extend({
  
  url: 'https://api.parse.com/1/classes/chatterbox',
  defaults: {}

});

var Messages = Backbone.Collection.extend({
  
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
  
  loadMsgs: function(){
    this.fetch({ data: { order: '-createdAt' } });
  },

  parse: function(response, options){
    var results = [];
    _.each(response.results, function(message){
      results.push(message);
    });

    return results;
  }

});

var MessageView = Backbone.View.extend({

  template: _.template('<div class="chat" data-id="<%- objectId %>">\
                        <div class="user" data-id="<%- username %>">\
                        <div class="text" data-id="<%- text %>">\
                        </div>'),

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});


var MessagesView = Backbone.View.extend({
  
  initialize: function(){
    this.collection.on('sync', this.render, this);
    this.onscreenmessages = {};
  },
  
  render: function(){
    this.collection.forEach(this.renderMessage, this);
  },

  renderMessage: function(message){
    if ( !this.onscreenmessages[message.get('objectId')] ){
      var messageView = new MessageView({ model: message });
    }
  }

})








/////////////////////////////
////Jquery Implementation////
/////////////////////////////




// // YOUR CODE HERE:
// var rooms = {};
// var user = {
//   // name: name,
//   // friends: []
// };


// var app = {
//   server: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
//   init: function() { app.fetch(); },
//   send: function( message ) { post(message); },
//   fetch: function() { get( parseRooms ); },
//   addMessage: function( message ) { $('#chats').append( message ) },
//   clearMessages: function() { $('#chats').empty() },
//   addRoom: function( roomName ) { $('#roomSelect').append( toHTML( roomName, 'room' ) ) },
// };


// var post = function(message){
//   $.ajax({
//     url: app.server,
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// };

// var get = function(fn, room){

//   $.ajax({
//     url: app.server,
//     type: 'GET',
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message received');
//       console.log(data);
//       fn(data, room);
//     },
//     error: function (data) {
//       console.error('chatterbox: Failed to receive message');
//     }
//   });
// };

// var toHTML = function(str, cssClass){
//   //deal with escaping
//   if(str){
//     var lt = /</g,
//     gt = />/g,
//     ap = /'/g,
//     ic = /"/g;
//     str = str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
//     return "<div class=" + cssClass + ">" + str + "</div>";
//   }
// }

// //Populate list of rooms

// var addRooms = function(rooms){
//   _.each(rooms, function(room){
//     app.addRoom(room);
//   });
// };

// var parseRooms = function(response){
//   var data = response.results;
//   _.each(data, function(datum){
//       rooms[datum.roomname] = datum.roomname;
//   });

//   addRooms(rooms);
// };


// //Display all messages in the selected room
// //All messages have username and message (and room)

// var parseMessages = function(response, room){
//   var data = response.results;
//   console.log("parsethis", this)
//   _.each(data, function(datum){
//     if(datum.roomname === room){
//       createMessage(datum.text, datum.username);
//     }
//   });
// }

// var createMessage = function( message, username ){
//   var $div = '<div class="message">' + toHTML(username, 'username') + toHTML(message, 'chat') + "</div>";
//   app.addMessage($div);
// }


// // app.init();

