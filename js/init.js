var Player = null;
var availableResources = [
	'iron',
	'grain',
	'wood',
	'animal'
];
var recipes = [];
recipes['Grain mill'] =	{
	name: 'Grain mill',
	requisites: {
		grain: 10,
		wood: 50,
		iron: 25,
		animal: 4
	},
	requiredBuildings: {
		buildings: [
			'Farm'
		]
	},
	sprite: {
		img: 'images/farm.jpg',
		classToGiveSprite: '.grainIncrease'
	},
	result: {
		resource: 'grain',
		type: 'increasePerSecond',
		amount: {
			1: '1',
			2: '2'
		}
	},
	requiredLevel: 2
};

recipes['Farm'] =	{
	name: 'Farm',
	requisites: {
		grain: 10,
		wood: 10,
		iron: 10,
		animal: 10
	},
	requiredBuildings: {

	},
	requiredLevel: 1,
	
	result: {
		resource: 'grain',
		type: 'increasePerSecond',
		amount: {
			1: '2',
			2: '4'
		}
	}
};

recipes['Pasture'] =	{
	name: 'Pasture',
	requisites: {
		grain: 50,
		wood: 50,
		iron: 25,
		animal: 25
	},
	requiredBuildings: {

	},
	requiredLevel: 1,
	sprite: {
		img: 'images/pasture.jpg',
		classToGiveSprite: '.animalIncrease'
	},
	result: {
		resource: 'animal',
		type: 'increasePerSecond',
		amount: {
			0: '1',
			1: '2',
			2: '4'
		}
	}
};

recipes['Iron mine'] =	{
	name: 'Iron mine',
	requisites: {
		grain: 50,
		wood: 50,
		iron: 25,
		animal: 25
	},
	requiredBuildings: {

	},
	requiredLevel: 1,
	sprite: {
		img: 'images/mine.jpg',
		classToGiveSprite: '.ironIncrease'
	},
	result: {
		resource: 'iron',
		type: 'increasePerSecond',
		amount: {
			0: '1',
			1: '2',
			2: '4'
		}
	}
};

recipes['Wood cutter'] =	{
	name: 'Wood cutter',
	requisites: {
		grain: 50,
		wood: 50,
		iron: 25,
		animal: 25
	},
	requiredBuildings: {

	},
	requiredLevel: 1,
	sprite: {
		img: 'images/forest.jpg',
		classToGiveSprite: '.woodIncrease'
	},
	result: {
		resource: 'wood',
		type: 'increasePerSecond',
		amount: {
			0: '1',
			1: '2',
			2: '4'
		}
	}
};


$(document).ready(function () {
	init();

});

var craft;
function init () {
	Player = new PlayerO();

	for (var i in availableResources) {
		Player.setNewResource(availableResources[i]);
	}

	craft = new Craft(recipes);
	
	$(document).on('resourceUpdated', function () {
		console.log(123);
		craft.refreshRecipes();
	});

}