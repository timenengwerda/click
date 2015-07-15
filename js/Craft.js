function Craft (recipes) {
	this.player = Player;
	this.recipes = recipes;
	var that = this;

	this.refreshRecipes = function () {
		//clear the HTML to make it ready for a redraw
		/*$('.recipebook > ul').html('');
		$('.recipebook > ul button').each(function () {
			//find all buttons and remove the click listeners
			$(this).off('click');
		});*/

		for (var i in this.recipes) {

			var recipeOrFalse = this.listItemExists(this.recipes[i]);
			if (recipeOrFalse !== false) {
				//the recipe exists already and is in var recipeOrFalse;
				this.redrawListItem (recipeOrFalse);

			} else {
				//Check if the user's level is high enough for this building
				if (Player.getLevel() >= this.recipes[i].requiredLevel) {
					//create a new recipe, since it doesnt exist
					this.drawNewRecipe(this.recipes[i]);
					
				}
				
			}

		}
		
	}

	this.listItemExists = function (recipe) {
		
		var exists = false;
		$('.recipebook > ul > li').each(function () {
			if ($(this).data('recipe') == recipe.name) {
				exists = $(this);
			}
		});

		return exists;
	}

	this.redrawListItem = function (obj) {
		var recipeName = obj.data('recipe');
		var notEnoughResources = false;

		//get the amount that should be needed by now. if its undefined, drop the object. Youve reached max level with this building.
		var amountLevel = Player.getBuildingLevel(recipeName)+1;	

		if (that.recipes[recipeName].result.amount[amountLevel]) {
			obj.find('ul.requisites > li').each(function () {
				var resourceName = $(this).data('resourceName');

				var currentResourceAmount = that.player.getResourceAmount(resourceName);
				var amountNeeded = that.recipes[recipeName].requisites[resourceName];
				if (amountNeeded > currentResourceAmount) {
					//This resource is insufficient. The parent's listitem will get flagged as uncraftable
					notEnoughResources = true;
				}
			});

			//Find the amountNeeded span and update it
			
			obj.find('.increaseAmount').html(that.recipes[recipeName].result.amount[amountLevel]);

			var buyButton = obj.find('.buyBuilding');
			if (notEnoughResources) {
				buyButton.attr('disabled', 'disabled');
			} else{
				buyButton.removeAttr('disabled');
			}
		} else {
			obj.remove();
		}

	}

	this.drawNewRecipe = function (recipe) {
		var listitem = $('<li/>');
		listitem.data('recipe', recipe.name);
		listitem.html('<span>' + recipe.name + '</span>');

		var requisitesList = $('<ul />').addClass('requisites');

		//if the amountlevel is undefined, dont rebuild this item. Its already maxlevel.
		var amountLevel = Player.getBuildingLevel(recipe.name)+1;	
		if (that.recipes[recipe.name].result && that.recipes[recipe.name].result.amount[amountLevel]) {


			//var to see if all resources needed are there.
			//After looping through the resources there will be a result based on this var. if this is var changed to true in the resourcesLoop it means that one or more resources aren't sufficient.
			var notEnoughResources = false;

			for (var resourceName in recipe.requisites) {
				var currentResourceAmount = this.player.getResourceAmount(resourceName);
				var amountNeeded = recipe.requisites[resourceName];
				var requisitesListitem = $('<li />');
				requisitesListitem.data('resourceName', resourceName);
				if (amountNeeded > currentResourceAmount) {
					//This resource is insufficient. The parent's listitem will get flagged as uncraftable
					notEnoughResources = true;
				}
				
				requisitesListitem.append('<span class="resourceName">' + resourceName + '</span>: <span class="amountNeeded">' + amountNeeded + '</span>');
				requisitesList.append(requisitesListitem);
			}

			var explanation = $('<li/>').addClass('explanation');
			
			explanation.html(recipe.result.type + ' ' + recipe.result.resource +' by <span class="increaseAmount">' + recipe.result.amount[Player.getBuildingLevel(recipe.name)+1] +'</span>');

			requisitesList.append(explanation);

			var buyButton = $('<button />').addClass('buyBuilding');
			listitem.append(buyButton);
			buyButton.html('Buy ' + recipe.name);

			buyButton.on('click', function (e) {
				e.preventDefault();

				that.craftItem(recipe);
			});

			

			if (notEnoughResources) {
				//Not enough resources to craft this item. add a class to disable it and stuff
				listitem.addClass('insufficientResources');
				buyButton.attr('disabled', 'disabled');
			}
			listitem.append(requisitesList);

			$('.recipebook > ul').append(listitem);
		}

	}

	this.refreshRecipes();

	this.hasEnoughResources = function (recipe) {
		//By default the player has enough resources, unless the loops tells otherwise.
		var hasEnoughResources = true;
		for (var resourceName in recipe.requisites) {
			var amountNeeded = recipe.requisites[resourceName];
			var currentResourceAmount = that.player.getResourceAmount(resourceName);

			if (amountNeeded > currentResourceAmount) {
				hasEnoughResources = false;
			}
		}

		return hasEnoughResources;

	}

	this.craftItem = function (recipe) {
		if (this.hasEnoughResources(recipe)) {
			for (var resourceName in recipe.requisites) {
				var amountNeeded = recipe.requisites[resourceName];
				Player.setResourceAmount(resourceName, Player.getResourceAmount(resourceName) - amountNeeded);
			}

			var spriteObj = that.recipes[recipe.name].sprite;
			if (spriteObj && spriteObj.classToGiveSprite) {
				$(spriteObj.classToGiveSprite).css('background', 'url(' + spriteObj.img +') no-repeat');
				console.log($(spriteObj.classToGiveSprite).css('background'));
			}

			Player.addBuilding(recipe);



			Player.increaseCurrentExp(20);
			this.refreshRecipes();

		}
	}

	var ticks = 0;
	//trigger a resourceUpdate every 1 seconds. This will update recipes+buybuttons and such
	setInterval(function () {
		that.refreshRecipes();
		if (ticks < 7) {
			Player.increaseCurrentExp(23);
			ticks++;
		}
		
	}, 1000);
}