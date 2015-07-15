function Resource (resourceName) {
	this.resourceName = resourceName;
	this.amount = 0;
	this.amountPerSecond = 0;
	this.maxAmount = 100;

	var that = this;


	this.setAmount = function (amount) {
		if (amount <= this.getMaxAmount()) {
			this.amount = parseInt(amount);
		} else {
			this.amount = this.getMaxAmount();
		}
		
		this.drawTotal();
	}

	this.getAmount = function () {
		return parseInt(this.amount);
	}

	this.increaseMaxAmount = function (amount) {
		this.maxAmount += amount;
	}

	this.getMaxAmount = function () {
		return parseInt(this.maxAmount);
	}


	this.setAmountPerSecond = function (amount) {
		this.amountPerSecond = parseInt(amount);
	}

	this.getAmountPerSecond = function () {
		return this.amountPerSecond;
	}

	this.increaseAmount = function (amount) {
		this.setAmount(this.getAmount() + parseInt(amount));
	}

	this.increasePerSecondTimer = null;
	this.setTimer = function () {
		this.increasePerSecondTimer = setInterval(function () {
			that.setAmount(that.getAmount() + that.getAmountPerSecond());
			that.drawTotal ();

		}, 1000);
	}

	this.clearTimer = function () {
		clearInterval(this.increasePerSecondTimer);
		this.increasePerSecondTimer = null;
	}

	this.resourceBarObject = null;
	this.drawTotal = function () {
		if (this.resourceBarObject == null) {
			this.resourceBarObject = $('<span />').addClass(this.getResourceName()).addClass('resource');
			$('.resource_bar').append(this.resourceBarObject);
		}

		this.resourceBarObject.html(this.getResourceName() + ': ' + this.getAmount() +'/'+ this.maxAmount);
	}

	this.getResourceName = function () {
		return this.resourceName;
	}

	$('.'+ this.getResourceName() + 'Increase').show();

	$('.'+ this.getResourceName() + 'Increase').click(function (e) {
		e.preventDefault();
		that.increaseAmount($(this).data('increaseamount'));
	});

	this.drawTotal();
	this.setTimer();
}