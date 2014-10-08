exports = module.exports = Player;

function Player(usrId)
{
	//this.userName = usrName;
	//this.userColor = usrColor;
	this.userMap = [];
	this.userId = usrId;
}

Player.prototype.setName = function(name)
{
	this.userName = name;	
}

Player.prototype.setColor = function(color)
{
	this.userColor = color;
}

Player.prototype.setId = function(id)
{
	this.userId = id;
}

Player.prototype.getId = function()
{
	return this.userId;
}

Player.prototype.getName = function()
{
    return this.userName;
}

Player.prototype.getColor = function()
{
    return this.userColor;
}

Player.prototype.setUnits = function(unitsNr)
{
	this.unitsTotal = unitsNr;
}

Player.prototype.getUnits = function()
{
	return this.unitsTotal;
}

Player.prototype.addToMap = function(region)
{
	this.userMap.push(region);
}

Player.prototype.removeFromMap = function(region)
{
	var index = this.userMap.indexOf(region);
	if (index > -1) {
    	this.userMap.splice(index, 1);
	}	
}

Player.prototype.getUserMap = function()
{
	return this.userMap;
}

//module.exports = Player;

