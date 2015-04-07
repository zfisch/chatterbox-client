$(document).ready( function () {

  //Need to provide place to select room
  $('body').on('click', '.room', function(){
    var room = $(this).text();
    app.clearMessages();
    get(parseMessages, room);
  });


});
