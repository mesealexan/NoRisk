var thisClientId;
var Player = require("./Player.js")
var __player;

function loginConnect()
{
	socket = io.connect();

	socket.on('connected', function(data){
		console.log('conected to server with uniqueID: '+data.uniqueID);
		var thisPlayer = new Player(data.uniqueID);
		__player = thisPlayer;
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
		socket.emit('userDetails', paket);
	});



	socket.on('allPlayerConnections', function (data){
		var connectedPlayer = new Player();
		connectedPlayer = data.playerCon;
		console.log('Number of connections received:'+data.totalConnected);
		console.log('connected player: '+connectedPlayer.userName);
		document.getElementById("conUsers").value = data.totalConnected;
	});

}