$(document).ready(function() {

$("#login").submit(function(event) {
  event.preventDefault();
  var username = $(".username").val();
  var password = $(".password").val();
  var requestData = {
    "username" : username,
    "password"  : password
  }
$.post("login", requestData)
.done(function (data) {
  if (data.status == 200 ) {
      let firstname = data.first;
      let lastname = data.last;
      var username = firstname + lastname.charAt(0);
      console.log(username);
      window.name = username;
      window.location = "chat.html";
  }
  if (data.status == 500 ) {
    console.log("naaah");
  }
  })
});

$("#register").submit(function(event) {
  event.preventDefault();
  let pass1 = $(".pass").val();
  let pass2 = $(".rePass").val();
  if (pass1 === pass2) {
      console.log("Password er ens!");
  }
  else {
    return;
  }
  var userData = {
    "username" : $(".user").val(),
    "password"  : pass1,
    "first" : $(".first").val(),
    "last" : $(".last").val()
  }
  $.post("register", userData)
  .done(function (data) {
    console.log(data.status);
    if (data.status == 200 ) {
      alert("User created successfully");
      var username = data.message.first + data.message.first.charAt(0);
      console.log(username);
      window.name = username;
      window.location = "chat.html";
    }
    if (data.status == 500 ) {
      console.log("naaah");
    }
    })

});

});
