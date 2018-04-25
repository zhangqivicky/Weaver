// A $( document ).ready() block.
$( document ).ready(function() {
  $('#menu-about').click(function(){
    $('#about').fadeIn(1000);
    $('#contact').hide();
  });
  $('#menu-contact').click(function(){
    $('#contact').fadeIn(1000);
    $('#about').hide();
  });

  $('span.event-date').html(
    function(){
      var time = new Date($(this).text()).getTime();
      var date = new Date(time);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();
      // Will display time in 10:30:23 format
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      $(this).text($(this).text().substr(0, 10) + ' ' + formattedTime);
    }
  );
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  var iframe = document.getElementById("map");
  var location = $(".html-location").val();
  iframe.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDGKuZQhk8Iz2d17yJjeRrKovxk29FFlSI&q="+location.replace(" ", "+");

  // define a group of global variables
  var curUsername = makeid();

  // initialize pubnub instance for api access
  var pubnub = new PubNub({
    publishKey : 'demo',
    subscribeKey : 'demo',
    ssl: true
  });

  pubnub.subscribe({
    channels: ['weaver_general'],
    withPresence: true
  });

  // add listeners to the pubnub obj, here I only handle message.
  pubnub.addListener({
    message: function(m) {
      // handle message
      if(!curUsername) return; // if not join the team, do nothing
      var channelName = m.channel; // The channel for which the message belongs
      var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
      var pubTT = m.timetoken; // Publish timetoken
      var msg = m.message; // The Payload
      var publisher = m.publisher; // The Subscription
      // Here we adopt the strategy if pushed message is from current channel, just append it to the end.
      // if it is not from current channel, reminder user by adding a red bullet to related channel.
      $('ul#messages').append(getMsgItem(pubTT, msg));
      $('ul#messages').scrollTop($('ul#messages')[0].scrollHeight); // scroll to the bottom to show new message
    }
  });

  // handle messge submission
  $("#msg-submit").click(function(){
    var message = $("input[name=message]").val().trim();
    if(message.length == 0){  // if message is empty
      return;
    }
    // build message by combing username with input
    message =  curUsername + ": " + message;

    // start to publish now
    var publishConfig = {
      channel : ['weaver_general'],
      message : message
    }
    pubnub.publish(publishConfig, function(status, response) {
      console.log(status, response);
    })
  });

  // Build the row of time and message shown in mqin column
  function getMsgItem(time, message){
    var d = new Date(Math.round(time/1000));
    date = d.toString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    var item = '<li class="list-group-item">';
    item += '<span class="time">' + date + '</span>';
    item += '<span class="message">' + message + '</span></li>';
    return item;
  }
});
