$(document).ready(function() {

  if (window.name == "") {
    alert("Please login first!")
    window.location= "index.html"

  }

$(".username").append(window.name);

    $.get("messages", function( messages ){

          messages.forEach(function(message) {
          $("#message-list").prepend("<li class='list-group-item'>" + message+ "</li>")
        })

      });

      let socket = io.connect("http://localhost:3000");

      $("#send").on("click",function () {
        let message = $("#message").val();
        socket.emit("chat", {"sender" : window.name , "message": message});

      })

    socket.on("chat-message", function(data) {
      $("#message-list").prepend("<li class='list-group-item'><b>" + data.sender +"</b>:  "+ data.message + "</li>")
});


});
