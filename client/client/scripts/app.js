var app = {
  //declare app properties
 // server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  //list of rooms
  server: '127.0.0.1:3000/classes/messages',
  rooms: [],
  //list of friends
  friends: [],

  //initalize app
  init() {
    //set jquery event handlers for ui elements
    //submit message when submit button is clicked
    $('.submit').click(app.handleSubmit); 
    //does nothing, exists only for spec
    $('.submit').submit(app.handleSubmit); 
    //refresh messages when refresh button is fixed 
    $('.refresh').click(()=> {
      //clear all messages
      app.clearMessages();
      //load messages for current room
      app.loadRoom();
    });
    //change room when room is selected from room dropdow
    $('#rooms').on('change', '#roomSelect', app.loadRoom);
    //add a new room when add room button is clicked
    $('.addRoom').on('click', app.addRoom);// when clicked pn Add room button, call addRoom method
    //call handleUsernameClick when username is clicked
    $('#chats').on('click', '.username', app.handleUsernameClick);

    //do initial load of messages
    //get data and build rooms list (rooms' dropbox selection)
    app.fetch(app.getRoomList, {
      limit: 1000,
      order: '-updatedAt'
    });
  },
  
  //server communication functions
  send(message) {
    //create ajax call to send message
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch(callback, options = {order: '-updatedAt'}) {
    //create ajax call to fetch messages from server
    $.ajax({
      url: app.server,
      //pass server parameters to filter data
      data: options,
      type: 'GET',
      // when success in getting data, do callback function
      success: callback,
      error: function (data) {
        console.error('chatterbox: Failed to receive messages', data);
      }
    });
  },

  //message display functions
  renderMessage(message) {
    // append a div with username: text message after escaping and roonname to chat Id div
    //get date of message
    let date = new Date(message.updatedAt);
    $('#chats').append(`<div class="message ${message.objectId}"><a href="#" class="username">${$('<div>').text(message.username).html()}</a>
      <span class="text">${$('<div>').text(message.text).html()}</span><span class="time">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</span></div>`);
    // bold message if it's a friend's message
    if (app.friends.indexOf(message.username) !== -1) {
      $(`.${message.objectId}`).css('font-weight', 'bold');
    }
  },

  renderMessageData(data) {
    // display messages
    //iterate through data received from server
    for (let i = 0; i < data.results.length; i++) {
      //render each message with renderMessage
      app.renderMessage(data.results[i]);
    }
  },

  clearMessages() {
    // clears all messages
    //clear chats div
    $('#chats').empty();
  },

  //room functions
  loadRoom() {
    //load messages from desired room
    //clear all messages first
    app.clearMessages();
    //fetch messages filtered by current room
    app.fetch(app.renderMessageData, {
      where: {
        roomname: $('#roomSelect').val()
      },
      order: '-updatedAt'
    });
  },

  getRoomList(data) {
    // clear rooms' array
    app.rooms = [];
    // clears all rooms from roomSelect div (rooms' drop box selection) in order to add(append) current rooms from receieved data
    $('#roomSelect').empty();
    // for each message
    for (let i = 0; i < data.results.length; i++) {
      //  if room of message isn't stored in rooms' array, and room of message isn't undefined
      if (app.rooms.indexOf(data.results[i].roomname) === -1 && data.results[i].roomname) {
        // stored room of message in rooms' array
        app.rooms.push(data.results[i].roomname);  
        // append room in roomSelect div (to display in rooms' drop box selection)
        $('#roomSelect').append(`<option value="${data.results[i].roomname}">${data.results[i].roomname}</option>`);
      }
    }
    $('#roomSelect').val('lobby');
    app.loadRoom();
  },

  addRoom() {
    // get room name from user
    var newRoom = prompt('What is the name of the room?');
    // if room is already in rooms' array, inform user
    if (app.rooms.indexOf(newRoom) !== -1) {
      var newRoom = alert('Room already exists.');
    } else {
      // else, if it is a new room
      // append to rooms' drop box the new room
      $('#roomSelect').append(`<option value="${newRoom}">${newRoom}</option>`);
      // change drop box selection to new room
      $('#roomSelect').val(newRoom);
      // store new room in rooms' array
      app.rooms.push(newRoom);
      // load messages for chosen room
      app.loadRoom();
    }
  },

  //handler functions
  handleUsernameClick(event) {
    // push clicked friend to friend's array
    app.friends.push($(event.currentTarget).text());
    // get data and refresh current room
    app.loadRoom();
  },

  handleSubmit(event) {
    // prevent refresh of window (occurs since 'submit' button has type of submit)
    event.preventDefault();
    // get our username which is displayed on url address
    var username = window.location.search;
    username = username.split('=')[1]; 
    // get message typed in input text box 
    var messageText = $('#message').val();
    // build message
    var message = {
      username,
      text: messageText,
      roomname: $('#roomSelect').val()
    };
    // send message to server
    app.send(message);
    // clear content of input text box
    $('#message').val('');
    // refresh messages of current room (in order to dispaly new message with previous messages of room)
    app.loadRoom();
  },

  //misc spec functions
  renderRoom() {
    //just for spec
    $('#roomSelect').append('<div id="spec"></div>');
  }
};