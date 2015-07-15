function Building (recipe) {
	this.level = 1;
	this.name = recipe.name,
	this.type = recipe.result.type,
	this.amount = recipe.result.amount,
	this.resourceAffected = recipe.result.resource


	this.updateResourceFunctionality = function () {
		console.log(this.getLevel());
		switch (this.type) {
			case 'increasePerSecond':
				var affectedResource = Player.getResource(this.resourceAffected);
				affectedResource.setAmountPerSecond(affectedResource.getAmountPerSecond() + parseInt(this.amount[this.level]));
				break;
		}
	}

	this.setLevel = function (level) {
		this.level = level;

		this.updateResourceFunctionality();
	}

	this.getLevel = function () {
		return this.level;
	}

	this.updateResourceFunctionality();

}