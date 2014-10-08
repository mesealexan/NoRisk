var thisClientId;

function loginConnect()
{
	socket = io.connect();

	socket.on('connected', function(data){
		console.log('conected to server with uniqueID: '+data.uniqueID);
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
		socket.emit('userDetails', paket)
	});



	socket.on('allPlayerConnections', function (data){
		console.log('Number of connections received:'+data.totalConnected);
		console.log('connected player: '+data.playerCon.getName());
		document.getElementById("conUsers").value = data.totalConnected;
	});

}