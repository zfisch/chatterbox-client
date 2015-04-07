$(document).ready( function () {

  //Need to provide place to select room
  $('body').on('click', '.room', function(){
    var room = $(this).text();
    $('#room').text(room);
    app.clearMessages();
    get(parseMessages, room);
  });

  $('button').click(function(){
    event.preventDefault();
    var message = {
      'username': $('#name').val(),
      'text': $('#msg').val(),
      'roomname': $('#room').val()
    }
    app.send(message);
    app.clearMessages();
    get(parseMessages, $('#room').val());
  });


});
