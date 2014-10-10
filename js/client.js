var thisClientId;
//var Player = require("./server/Player.js")
var __player;
var socket;
var plStatus = false;

function loginConnect()
{
	socket = io.connect();

	socket.on('connected', function(data){
		console.log('conected to server with uniqueID: '+data.uniqueID);
		var clienticonectati = data.clients;
		for (var i=0;i<clienticonectati.length;i++)
		{
			if (clienticonectati[i].userName)
				injectPlayer(clienticonectati[i].userName, clienticonectati[i].userColor, clienticonectati[i].userStatus);
		}
		var thisPlayer = new Player(data.uniqueID);
		__player = thisPlayer;
		//console.log(__player.userId)
		thisClientId = data.uniqueID;
		/*
		setInterval(function(){
			var paket = {
				id: data.uniqueID,
				x:PhysicalCube.position.x,
				y:PhysicalCube.position.y,
				z:PhysicalCube.position.z,
				position:censor(PhysicalCube.position),
				quaternion:{
					x:mesh116.quaternion.x,
					y:mesh116.quaternion.y,
					z:mesh116.quaternion.z,
					w:mesh116.quaternion.w,
					},
				//angle:PhysicalCube.position.angleTo(),
				}
				//console.log('trimite x:' + paket.x);
			socket.emit('position', paket);
		}, 500);
		*/

		var paket = {
			userN: document.getElementById("pln").value, 
			userC:document.getElementById("plc").value
		}
		__player.userName = document.getElementById("pln").value;
		__player.userColor = document.getElementById("plc").value;
		__player.userStatus = 'Not ready';

		socket.emit('userDetails', paket);
	});



	socket.on('allPlayerConnections', function (data){
		//var connectedPlayer = new Player();
		var connectedPlayer = data.playerCon;
		console.log('Number of connections received:'+data.totalConnected);
		console.log('connected player: '+connectedPlayer.userColor);
		//document.getElementById("conUsers").value = data.totalConnected;
		injectPlayer(connectedPlayer.userName, connectedPlayer.userColor, 'Not Ready')
	});

	socket.on('clientDisconnected', function (data){
		//var connectedPlayer = new Player();
		var dcdPlayer = data.playerCon;
		//console.log('Number of connections received:'+data.totalConnected);
		console.log('disconected player: '+dcdPlayer.userName);
		//document.getElementById("conUsers").value = data.totalConnected;
		removePlayer(dcdPlayer.userName);
	});

	socket.on('statusChanged', function (data){
		playerReady(data.playerName, data.playerStatus);
	});
}

function clickReady()
{
	plStatus = !plStatus;
	var sendStatus = (plStatus == true ? "Ready" : "Not ready");
	__player.userStatus = sendStatus;
	playerReady(__player.userName, sendStatus);

	var paket = {
		playerName: __player.userName,
		newStatus: __player.userStatus
	}
	socket.emit('userStatusChange', paket)
}

