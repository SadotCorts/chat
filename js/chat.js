var socket = io();
var cont = 0;
var usuarios = {}
let dom = [
	[0,0],
	[0,1],
	[0,2],
	[0,3],
	[0,4],
	[0,5],
	[0,6],
	[1,1],
	[1,2],
	[1,3],
	[1,4],
	[1,5],
	[1,6],
	[2,2],
	[2,3],
	[2,4],
	[2,5],
	[2,6],
	[3,3],
	[3,4],
	[3,5],
	[3,6],
	[4,4],
	[4,5],
	[4,6],
	[5,5],
	[5,6],
	[6,6]
];
let fichasS = [], fichas =[];

function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
	  if(message == "start") {
		domino();
	  }
	  if(message == "giveme") {
		getDomino(from);
	  }
	socket.emit('chatMessage', from, message);
	}
	$('#m').val('').focus();
	return false;
}

function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}

socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});

$(document).ready(function(){
  var name = makeid();
  $('#user').val(name);
	socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion ---> to play domino use this commands, '+'<b>'+'start'+'</b>'+' to start the game, '+'<b>'+'giveme'+'</b>'+' to recieve dominoes.');
  // usuarios.username = name;
  // usuarios.number = Math.floor(Math.random()* (10 - 0)) + 0;
	socket.emit('saveUser',name)
});

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
 socket.on('saveUser', function(user) {
	 Object.defineProperty(usuarios, user, {
		 enumerable: false,
		 configurable: true,
		 writable: true,
		 value: 'static'
	 });
	 console.log(usuarios)
 })
 function domino() {
	for(let i=0; i <= 28; i++) {
		console.log('++ Fichas Creadas')
	}
 }

 function getDomino(user) {
	 console.log('Start')
	 let a = Math.floor(Math.random()*(29-0))-0;
	 fichas.push(5)
	 console.log(fichas.find(5))
	 // while(cont < 5) {
		 // let a = Math.floor(Math.random()*(29-0))-0;
		 // fichas.find(a)
	 // }
 }
