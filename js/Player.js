function PlayerO () {
	this.level = 1;
	this.resources = [];
	this.buildings = [];

	this.constant = 100;
	this.currentExp = 0;
	this.expNeeded = null;

	this.expBar = $('.expBar');
	this.expBarText = this.expBar.find('.expText');
	this.progressBar = this.expBar.find('.progressBar');


	this.getNeededExp = function () {
		return this.expNeeded;
	}

	this.getCurrentExp = function () {
		return this.currentExp;
	}

	this.setCurrentExp = function (num) {
		this.currentExp = num;
	}

	this.setExpNeeded = function () {
		this.expNeeded = Math.round(this.constant * Math.sqrt(this.getLevel()));
	}

	this.increaseCurrentExp = function (amount) {
		if (this.expNeeded == null) {
			this.setExpNeeded();
		}

		this.setCurrentExp(this.getCurrentExp() + amount);
		if (this.getCurrentExp() > this.getNeededExp()) {
			this.levelUp();
		}

		this.drawExp();
	}

	this.levelUp = function () {
		var neededExpBeforeLeveling = this.getNeededExp();
		var currentExp = this.getCurrentExp();
		
		this.setLevel(this.getLevel()+1);
		

		//if the current EXP is higher than the exp needed, this should be taken in account when leveling up
		//If the user has a current exp of 110 and needed 100 to level; start the new level with 10 exp
		if (currentExp > neededExpBeforeLeveling) {
			this.setCurrentExp(currentExp - neededExpBeforeLeveling);
		}

		this.progressBar.width(0);
	}

	this.drawExp = function () {
		this.expBarText.html(this.getCurrentExp() +'/'+ this.getNeededExp());

		var fullWidthExpBar = this.expBar.width();

		var percentage = (100 * this.getCurrentExp()) / this.getNeededExp();
		
		this.progressBar.width(percentage+'%');
	}

	this.setNewResource = function (resourceName) {
		this.resources[resourceName] = new Resource(resourceName);
	}

	this.getResource = function (resourceName) {
		return this.resources[resourceName];
	}

	this.getResourceAmount = function (resourceName) {
		if (this.resources[resourceName]) {
			return this.getResource(resourceName).getAmount();
		}
		
		return false;
	}

	this.setResourceAmount = function (resourceName, newAmount) {
		this.resources[resourceName].setAmount(newAmount);
	}

	this.getLevel = function () {
		return this.level;
	}

	this.setLevel = function (nr) {
		this.level = nr;
		this.setExpNeeded();
	}

	this.buildingExists = function (buildingName) {
		for (var i in this.buildings) {
			if (buildingName == this.buildings[i].name) {
				return true;
			}
		}

		return false;
	}

	this.getBuildingLevel = function (recipeName) {
		if (this.buildings[recipeName]) {
			return parseInt(this.buildings[recipeName].getLevel());
		}
		

		return 0;
	}

	this.addBuilding = function (recipe) {
		//Check to see if the building exists already. if so, upgrade its level.
		if (this.buildingExists(recipe.name)) {
			//Existing building. Upgrade it.
			this.buildings[recipe.name].setLevel(this.buildings[recipe.name].getLevel() + 1);
		} else {
			//new building
			this.buildings[recipe.name] = new Building(recipe);
		}
	}

	this.increaseCurrentExp(0);
}