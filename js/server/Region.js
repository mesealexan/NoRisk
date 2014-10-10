exports = module.exports = Region;

function Region(id, meshId, units, regen, neighbours, continentId, user)
{
	// id - region ID
	// meshId - reference in 3d mesh
	// units - number of units in region
	// regen - units regenereted/turn
	// neighbours - array with neighbours id 
	// continentId - continent the region is in
	// user - the user the region belongs to (Player class)

	//this.userName = usrName;
	//this.userColor = usrColor;
	this.id = id;
	this.meshId = meshId;
	this.units = units;
	this.regen = regen;
	this.neighbours = neighbours;
	this.continentId = continentId;
	this.user = user;
}

Region.prototype.getId = function(){
	return this.id;
}

Region.prototype.getMeshId = function(){
	return this.meshId;
}

Region.prototype.getUnits = function(){
	return this.getUnits;
}

Region.prototype.getRegen = function(){
	return this.regen;
}

Region.prototype.getNeib = function(){
	return this.neighbours;
}

Region.prototype.getContinent = function(){
	return this.continentId;
}

Region.prototype.getOwner = function(){
	return this.user;
}

Region.prototype.setUnits = function(unit)
{
	this.units = unit;
}

Region.prototype.setOwner = function(owner){
	this.user = owner;
}
	