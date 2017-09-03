(function ($) {
	var damageType = ["Cryo", "Flame", "Laser", "Plasma", "Projectile", "Shock", "Sonic"];
	var damageTypeAbbrv = {
		"Cryo": " C",
		"Flame": " F",
		"Laser": " F",
		"Plasma": " E & F",
		"Projectile": " P",
		"Shock": " E",
		"Sonic": " So"
	};
	var criticalTypeSmall = {
		"Cryo": ["Staggered"],
		"Flame": ["Burn"],
		"Laser": ["Burn", "Staggered"],
		"Plasma": ["Burn", "Knockdown"],
		"Projectile": ["Knockdown", "-"],
		"Shock": ["Arc"],
		"Sonic": ["Knockdown", "Deafen"]
	};
	var criticalTypeLong = {
		"Cryo": ["Staggered"],
		"Flame": ["Burn"],
		"Laser": ["Burn", "Staggered", "Wound"],
		"Plasma": ["Burn", "Knockdown", "Corrode"],
		"Projectile": ["Knockdown", "Wound", "-"],
		"Shock": ["Arc"],
		"Sonic": ["Knockdown", "Deafen"]
	};
	var criticalTypeHeavy = {
		"Cryo": ["Staggered", "Wound"],
		"Flame": ["Burn"],
		"Laser": ["Burn", "Staggered", "Wound", "Severe Wound"],
		"Plasma": ["Burn", "Knockdown", "Corrode"],
		"Projectile": ["Knockdown", "Wound", "-", "Severe Wound"],
		"Shock": ["Arc"],
		"Sonic": ["Knockdown", "Deafen", "Wound"]
	};
	var criticalTypeSniper = {
		"Cryo": ["Staggered", "Wound"],
		"Flame": ["Burn", "Wound"],
		"Laser": ["Burn", "Staggered", "Wound", "Severe Wound"],
		"Plasma": ["Burn", "Knockdown", "Corrode", "Wound"],
		"Projectile": ["Knockdown", "Wound", "Severe Wound"],
		"Shock": ["Arc", "Wound"],
		"Sonic": ["Knockdown", "Deafen", "Wound"]
	};

	var armType = ["smallArm", "longarm", "heavyWeapon", "sniperWeapon"];
	var special = ["Analog", "Automatic", "Blast", "Boost", "Bright", "Entangle", "Explode", "Injection", "Line", "Penetrating", "Quick Reload", "Sniper", "Stun", "Unwieldy"];
	var criticalType = ["Arc", "Bleed", "Burn", "Corrode", "Deafen", "Injection DC +2", "Knockdown", "Severe wound", "Staggered", "Wound"];

	var smallSubType = ["Semi-Auto FX Pistol", "FX Machine Pistol", "FX Revolver", "FX Hand-Cannon"];
	var longSubType = ["FX Rifle", "FX Carbine", "FX Scattergun", "FX Submachine Gun"];
	var heavySubType = ["FX Cannon", "Heavy FX Repeater", "FX Thrower", "FX Railgun"];
	var sniperSubType = ["Shirren-eye FX Rifle", "Bolt Action FX Rifle", "Semi-Auto FX Rifle", "Gas-operated FX Rifle"];

	var boostDice = [
		["1d4", "1d6"],
		["1d6", "1d8"],
		["1d10", "1d12"],
		["2d6", "2d8"],
		["3d6", "2d10"]
	];

	var rangeSmall = [20, 30, 40];
	var rangeLong = [30, 40, 50, 60, 70];
	var rangeHeavy = [30, 40, 50, 60, 70, 80];
	var rangeSniper = [50, 60];

	var smallArmDamageCurve = {
		"1": ["1d4", "1d6"],
		"2": ["1d4", "1d6"],
		"3": ["1d6", "1d4"],
		"4": ["1d6", "1d8"],
		"5": ["1d6", "1d8"],
		"6": ["2d4", "1d8"],
		"7": ["2d4", "2d6"],
		"8": ["2d6", "3d4"],
		"9": ["2d6", "3d4"],
		"10": ["2d8", "3d4"],
		"11": ["2d8", "3d6"],
		"12": ["2d8", "4d4"],
		"13": ["3d6", "4d6"],
		"14": ["5d4", "3d8"],
		"15": ["4d6", "3d12"],
		"16": ["4d8", "3d12"],
		"17": ["8d4", "5d8"],
		"18": ["3d12", "4d12"],
		"19": ["6d6", "4d12"],
		"20": ["5d12", "9d6"]
	};
	var longarmDamageCurve = {
		"1": ["1d6", "1d8"],
		"2": ["1d6", "1d8"],
		"3": ["1d6", "1d8"],
		"4": ["1d8", "1d10"],
		"5": ["1d8", "1d10"],
		"6": ["1d12", "2d6"],
		"7": ["2d6", "2d8"],
		"8": ["2d8", "2d10"],
		"9": ["3d6", "2d10"],
		"10": ["2d10", "5d4"],
		"11": ["2d12", "3d8"],
		"12": ["2d12", "3d10"],
		"13": ["3d10", "3d12"],
		"14": ["4d8", "4d10"],
		"15": ["4d10", "4d12"],
		"16": ["6d8", "8d6"],
		"17": ["8d6", "12d4"],
		"18": ["7d8", "6d10"],
		"19": ["8d8", "6d12"],
		"20": ["8d10", "12d8"]
	};
	var heavyDamageCurve = {
		"1": ["1d8", "1d10"],
		"2": ["1d10", "1d10"],
		"3": ["1d10", "1d10"],
		"4": ["1d10", "2d6"],
		"5": ["2d6", "1d12"],
		"6": ["1d12", "2d6"],
		"7": ["2d8", "2d6"],
		"8": ["2d8", "2d10"],
		"9": ["2d10", "2d12"],
		"10": ["2d12", "3d8"],
		"11": ["3d8", "3d10"],
		"12": ["3d10", "4d6"],
		"13": ["4d8", "4d10"],
		"14": ["4d12", "6d6"],
		"15": ["4d12", "6d10"],
		"16": ["5d12", "6d10"],
		"17": ["7d8", "7d10"],
		"18": ["9d6", "8d8"],
		"19": ["8d10", "7d12"],
		"20": ["10d10", "9d12"]
	};
	var sniperDamageCurve = {
		"1": ["1d10"],
		"2": ["1d10"],
		"3": ["1d10"],
		"4": ["1d10"],
		"5": ["2d10"],
		"6": ["2d10"],
		"7": ["2d10"],
		"8": ["2d10"],
		"9": ["4d10"],
		"10": ["4d10"],
		"11": ["4d10"],
		"12": ["4d10"],
		"13": ["6d10"],
		"14": ["6d10"],
		"15": ["6d10"],
		"16": ["6d10"],
		"17": ["10d10"],
		"18": ["10d10"],
		"19": ["10d10"],
		"20": ["10d10"]
	};

	/**
	 * Choose a random element from an array.
	 * @param array array
	 *   May also work with an array-like object.
	 * @return whatever type the array holds
	 */
	function randomChoice(array) {
		if (length in array) {
			return array[Math.floor(Math.random() * array.length)];
		}
		else {
			console.error("Tried to pull a random value from an item that is not an array or an array-like object.");
			return;
		}
	}

	/**
	 * Nondestructively remove any blank entry from an array.
	 * @param array array
	 * @return array
	 */
	function removeBlankValues(array) {
		var splicedArray = array.slice(0);
		while (splicedArray.indexOf("") !== -1) {
			var index = splicedArray.indexOf("");
			splicedArray.splice(index, 1);
		}
		
		return splicedArray;
	}

	/**
	* Returns a random integer between min (inclusive) and max (inclusive)
	* Using Math.round() will give you a non-uniform distribution!
	*/
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function print(string) {
		var $outputArea = $(".output-area").first();
		$outputArea.append("<div>" + string + "</div>");
	}

	function clearOutput(string) {
		var $outputArea = $(".output-area").first();
		$outputArea.empty();
	}

	/**
	 * Get the weapon's tier based on its item level.
	 * @param level number
	 *   An integer from 1 to 20.
	 * @return number
	 */
	function getTier(level) {
		switch (level) {
			case 1: case 2: case 3: case 4:
				return 1;
			case 5: case 6: case 7: case 8:
				return 2;
			case 9: case 10: case 11: case 12:
				return 3;
			case 13: case 14: case 15: case 16:
				return 4;
			case 17: case 18: case 19: case 20:
				return 5;
			default:
				return NaN;
		}
	}

	function smallArm(level) {
		var tier = getTier(level);
		var randomDamageType = randomChoice(damageType);
		var gunType = randomChoice(smallSubType);
		var printLevel = level;

		// Hand-Cannon necessitates a higher level, I guess.
		if (gunType === "FX Hand-Cannon" && level !== 20) {
			level += 1;
		}

		var damage = randomChoice(smallArmDamageCurve[level]) + damageTypeAbbrv[randomDamageType];

		var gunName = gunType.replace("FX", randomDamageType).replace("Projectile ", "");

		var special = [];
		var ammo = [];

		// Range
		var rangeo = 0;
		rangeo = randomChoice(rangeSmall);
		rangeo += (10 * tier);
		if (tier === 5) {
			rangeo -= 10;
		}
		if (randomDamageType === "Laser") {
			rangeo += 20;
		}
		if (rangeo > 100) {
			rangeo = 100;
		}

		// Ammo // Special
		if (gunType === "FX Revolver") {
			ammo.push(randomChoice(["6 rounds", "8 rounds"]));
			ammo.push("1");
			special.push(randomChoice([
				"Boost " + randomChoice(boostDice[tier-1]),
				"Bright",
				"Quick Reload",
				"Stun",
				"-","-"
			]));
		}
		else if (gunType === "FX Hand-Cannon") {
			rangeo = 10 + (tier * 5) + randomChoice([0, 5]);
			if (rangeo > 30) {
				rangeo = 30;
			}
			special.push(randomChoice(["Blast", "Line"]));
			special.push("Unwieldy");
			ammo.push("1 shell");
			ammo.push("1");
		}
		else if (gunType === "Semi-Auto FX Pistol") {
			var semiAuto1 = [
				randomChoice(["20", "20", "40", "80"]) + " charges",
				randomChoice(["1", "1", "2", "4"])
			];
			var semiAuto2= [randomChoice(["10", "12", "16", "18"]) + " rounds", "1"];
			ammo = randomChoice([semiAuto1, semiAuto2]);
			special.push(randomChoice([
				"Boost "+ randomChoice(boostDice[tier-1]),
				"Bright",
				"Quick Reload",
				"Stun",
				"-","-"
			]));
		}
		else if (gunType === "FX Machine Pistol") {
			var semiAuto1 = [
				randomChoice(["20", "20", "40", "40"]) + " charges",
				randomChoice(["1", "1", "2", "4"])
			];
			var semiAuto2 = [randomChoice(["10", "12", "12", "24", "48"]) + " rounds", "1"];
			ammo = randomChoice([semiAuto1, semiAuto2]);
			special.push("Automatic");
		}

		if (special.join(", ") === "Analog, -") {
			special = ["Analog"];
		}

		// Critical
		var critical = randomChoice(criticalTypeSmall[randomDamageType]);
		// possibility of no critical in low tiers
		if (tier <= 2) {
			critical = randomChoice([critical, critical, "-"]);
		}

		if (critical === "Burn" || critical === "Arc") {
			var num, die;
			switch (level) {
				case 1: case 2: case 3: case 4: case 5: case 6:
				case 7: case 8: case 9: case 10: case 11:
					num = 1;
					die = randomChoice(["4", "6"]);
					break;
				case 12: case 13: case 14: case 15:
					num = 2;
					die = randomChoice(["4", "6", "8"]);
					break;
				case 16: case 17: case 18:
					num = 3;
					die = randomChoice(["4", "6", "8"]);
					break;
				case 19: case 20:
					num = 4;
					die = randomChoice(["4", "6", "8"]);
					break;
				default:
					console.error("Invalid level when trying to determine critical for small arm.");
					num = "?";
					die = "?";
			}
			critical = critical + " " + num + "d" + die;
		}

		print("Level " + printLevel + " " + gunName);
		print("Small arm - one-handed");
		print("");
		print("Damage: " + damage);
		print("Range: " + rangeo + " ft.");
		print("Critical: " + critical);
		print("Capacity: " + ammo[0]);
		print("Usage: " + ammo[1]);

		special = removeBlankValues(special);
		var printSpecial = special.join(", ");
		print("Special: " + printSpecial);
		print("Bulk: " + "L");
	}

	function longarm(level) {
		var tier = getTier(level);
		var randomDamageType = randomChoice(damageType);
		var gunType = randomChoice(longSubType);
		var printLevel = level;

		// Rifle necessitates a higher level, I guess.
		if (gunType === "FX Rifle" && level != 20) {
			level += 1;
		}

		var damage = randomChoice(longarmDamageCurve[level]) + damageTypeAbbrv[randomDamageType];

		var gunName = gunType.replace("FX", randomDamageType).replace("Projectile ", "");

		var special = [];
		var ammo = [];
		var bulk;

		// Range
		var rangeo = 0;
		rangeo = randomChoice(rangeLong);
		rangeo += (10 * tier);
		if (randomDamageType === "Laser") {
			rangeo += 20;
		}
		if (rangeo > 120) {
			rangeo = 120;
		}

		// Special
		special.push(randomChoice(["Analog", "", ""]));

		// Ammo
		if (gunType === "FX Rifle") {
			var semiAuto1 = [
				randomChoice(["20", "40", "80", "100"]) + " charges",
				randomChoice(["1", "2", "4", "10"])
			];
			var semiAuto2 = [randomChoice(["6", "12", "18"]) + " rounds", "1"];
			ammo = randomChoice([semiAuto1, semiAuto2]);
			special.push(randomChoice([
				"Boost "+ randomChoice(boostDice[tier-1]),
				"Penetrating",
				"Quick Reload",
				"-"
			]));
			bulk = randomChoice(["1","1","2"]);
		}
		else if (gunType === "FX Carbine") {
			var semiAuto1 = [randomChoice(["60", "80", "100"]) + " charges",randomChoice(["1", "2", "4", "10"])];
			var semiAuto2 = [randomChoice(["12", "24", "48"]) + " rounds", "1"];
			ammo = randomChoice([semiAuto1, semiAuto2]);
			special.push(randomChoice([
				"Automatic",
				"Boost " + randomChoice(boostDice[tier-1]),
				"Stun",
				"-"
			]));
			rangeo -= 30;
			if (rangeo < 40) {
				rangeo = 40;
			}
			bulk = "L";
		}
		else if (gunType === "FX Scattergun") {
			special.push("Blast");
			rangeo = 10 + (tier * 5) + randomChoice([0, 5]);
			if (rangeo > 30) {
				rangeo = 30;
			}
			ammo.push(randomChoice([
				"1 shell",
				"2 shells",
				"6 shells",
				"12 shells"
			]));
			ammo.push("1");
			bulk = "1";
		}
		else if (gunType === "FX Submachine Gun") {
			special.push("Automatic");
			var semiAuto1 = [
				randomChoice(["20", "40"]) + " charges",
				randomChoice(["1", "1", "2", "4"])
			];
			var semiAuto2 = [randomChoice(["10", "12", "12", "24", "48"]) + " rounds", "1"];
			ammo = randomChoice([semiAuto1, semiAuto2]);
			bulk = randomChoice(["1", "1", "2"]);
		}
		
		if (special.join(", ") === "Analog, -") {
			special = ["Analog"];
		}

		// Critical
		var critical = randomChoice(criticalTypeLong[randomDamageType]);
		// possibility of no critical in low tiers
		if (tier <= 2) {
			critical = randomChoice([critical, critical, "-"]);
		}

		if (critical === "Burn" || critical === "Arc" || critical === "Corrode") {
			var num, die;
			switch (level) {
				case 1: case 2: case 3: case 4: case 5: case 6:
				case 7: case 8: case 9: case 10: case 11:
					num = 1;
					die = randomChoice(["4", "6"]);
					break;
				case 12: case 13: case 14: case 15:
					num = 2;
					die = randomChoice(["4", "6", "8"]);
					break;
				case 16: case 17: case 18:
					num = 3;
					die = randomChoice(["4", "6", "8"]);
					break;
				case 19: case 20:
					num = 4;
					die = randomChoice(["4", "6", "8"]);
					break;
				default:
					console.error("Invalid level when trying to determine critical for longarm.");
					num = "?";
					die = "?";
			}
			critical = critical + " " + num + "d" + die;
		}

		print("Level " + printLevel + " " + gunName);
		print("Longarm - two-handed");
		print("");
		print("Damage: " + damage);
		print("Range: " + rangeo + " ft.");
		print("Critical: " + critical);
		print("Capacity: " + ammo[0]);
		print("Usage: " + ammo[1]);

		special = removeBlankValues(special);
		var printSpecial = special.join(", ");
		print("Special: " + printSpecial);
		print("Bulk: " + bulk);
	}

	function heavyWeapon(level) {
		var tier = getTier(level);
		var randomDamageType = randomChoice(damageType);
		var gunType = randomChoice(heavySubType);
		var printLevel = level;

		// Railgun necessitates a higher level, I guess.
		if (gunType === "FX Railgun" && level != 20) {
			level += 1;
		}
		var damage = randomChoice(heavyDamageCurve[level]) + damageTypeAbbrv[randomDamageType];

		var gunName = gunType.replace("FX", randomDamageType);

		var special = [];
		var ammo = [];

		// Range
		var rangeo = 0;
		rangeo = randomChoice(rangeHeavy);
		rangeo += (10 * tier);
		if (randomDamageType === "Laser") {
			rangeo += 30;
		}
		if (rangeo > 120) {
			rangeo = 120;
		}

		special.push(randomChoice([
			"Analog",
			"",
			"",
			""
		]));

		if (gunType === "FX Cannon") {
			gunName = gunName.replace("Projectile", "");
			ammo = [
				randomChoice(["40", "80", "100"]) + " charges",
				randomChoice(["2", "4", "5", "10"])
			];
			var radius = 5 * tier;
			rangeo -= 30;
			if (rangeo < 30) {
				rangeo = 30;
			}
			special.push("Explode (" + radius + " ft.)");
			special.push("Unwieldy");
		}
		else if (gunType === "Heavy FX Repeater") {
			gunName = gunName.replace("Projectile", "");
			var semiAuto1= [
				randomChoice(["60", "80", "100"]) + " charges",
				randomChoice(["1", "2", "4", "10"])
			];
			var semiAuto2= [randomChoice(["12", "24", "48"]) + " rounds", "1"];
			ammo = randomChoice([semiAuto1, semiAuto2]);
			special.push("Automatic");
			special.push(randomChoice(["Penetrating", ""]));
			rangeo -= 30;
		}
		else if (gunType === "FX Thrower") {
			gunName = gunName.replace("Projectile", "Laser");
			special.push(randomChoice(["Blast", "Line"]));
			special.push("Unwieldy");
			rangeo = 10 + (tier * 5) + randomChoice([0, 5]);
			if (rangeo > 30) {
				rangeo = 30;
			}
			ammo = [
				randomChoice(["60", "80", "100"]) + " charges",
				randomChoice(["2", "4", "10"])
			];
		}
		else if (gunType === "FX Railgun") {
			gunName = gunName.replace("Projectile", "");
			special.push("Line");
			special.push("Penetrating");
			special.push("Unwieldy");
			var semiAuto1= [
				randomChoice(["20", "40"]) + " charges",
				randomChoice(["2", "4", "10"])
			];
			var semiAuto2= [randomChoice(["8", "12", "18", "24"]) + " rounds", "1"]
			ammo = randomChoice([semiAuto1, semiAuto2]);
		}

		var bulk = randomChoice(["2", "2", "3"]);
		if (special.join(", ") === "Analog, -") {
			special = ["Analog"];
		}

		// Critical
		var critical = randomChoice(criticalTypeHeavy[randomDamageType]);
		// possibility of no critical in low tiers
		if (tier <= 2) {
			critical = randomChoice([critical, critical, "-"]);
		}

		if (critical === "Burn" || critical === "Arc" || critical === "Corrode") {
			var num, die;
			switch (level) {
				case 1: case 2: case 3: case 4: case 5: case 6:
				case 7: case 8: case 9: case 10: case 11:
					num = 1;
					die = randomChoice(["4", "6"]);
					break;
				case 12: case 13: case 14: case 15:
					num = 2;
					die = randomChoice(["4", "6", "8"]);
					break;
				case 16: case 17: case 18:
					num = 3;
					die = randomChoice(["4", "6", "8"]);
					break;
				case 19: case 20:
					num = 4;
					die = randomChoice(["4", "6", "8"]);
					break;
				default:
					console.error("Invalid level when trying to determine critical for heavy weapon.");
					num = "?";
					die = "?";
			}
			critical = critical + " " + num + "d" + die;
		}

		print("Level " + printLevel + " " + gunName);
		print("Heavy - two-handed");
		print("");
		print("Damage: " + damage);
		print("Range: " + rangeo + " ft.");
		print("Critical: " + critical);
		print("Capacity: " + ammo[0]);
		print("Usage: " + ammo[1]);

		special = removeBlankValues(special);
		var printSpecial = special.join(", ");
		print("Special: " + printSpecial);
		print("Bulk: " + bulk);
	}

	function sniperWeapon(level) {
		var tier = getTier(level);
		var randomDamageType = randomChoice(damageType);
		var gunType = randomChoice(sniperSubType);
		var printLevel = level;

		// Shirren-eye Rifle necessitates a higher level, I guess.
		if (gunType === "Shirren-eye FX Rifle" && level != 20) {
			level += 1;
		}
		var damage = randomChoice(sniperDamageCurve[level]) + damageTypeAbbrv[randomDamageType];

		var gunName = gunType.replace("FX", randomDamageType);

		var special = [];
		var ammo = [];

		// Range
		var rangeo = 0;
		rangeo = randomChoice(rangeSniper);
		rangeo += (10 * tier);
		if (randomDamageType === "Laser" || randomDamageType === "Projectile") {
			rangeo += 20;
		}
		if (rangeo > 100) {
			rangeo = 100;
		}

		if (randomDamageType === "Projectile") {
			special.push(randomChoice(["Analog", ""]));
		}

		gunName = gunName.replace("Projectile", "");

		if (gunType === "Shirren-eye FX Rifle") {
			ammo = [randomChoice(["4", "6", "8"]) + " rounds", "1"];
		}
		else if (gunType === "Bolt Action FX Rifle") {
			ammo = ["1 round", "1"];
		}
		else if (gunType === "Semi-Auto FX Rifle") {
			var semiAuto1 = [
				randomChoice(["20", "40", "60", "80"]) + " charges",
				randomChoice(["5", "10", "20"])
			];
			var semiAuto2 = [randomChoice(["4", "8", "12", "16"]) + " rounds", "1"];
			ammo = randomChoice([semiAuto1, semiAuto2]);
		}
		else if (gunType === "Gas-operated FX Rifle") {
			var semiAuto1 = [
				randomChoice(["20", "40"]) + " charges",
				randomChoice(["2", "4", "10"])
			];
			var semiAuto2 = [randomChoice(["4", "8", "12"]) + " rounds", "1"];
			ammo = randomChoice([semiAuto1, semiAuto2]);
		}

		// add sniper range
		var radius = 250 * tier;
		if (radius > 1000) {
			radius = 1000;
		}
		special.push(randomChoice(["Bright", "Penetrating", ""]));
		special.push("Sniper (" + radius + " ft.)");
		special.push("Unwieldy");

		var bulk = randomChoice(["1", "2"]);
		if (special.join(", ") === "Analog, -") {
			special = ["Analog"];
		}

		// Critical
		var critical = randomChoice(criticalTypeSniper[randomDamageType]);
		// possibility of no critical in low tiers
		if (tier <= 2) {
			critical = randomChoice([critical, "-"]);
		}

		if (critical === "Burn" || critical === "Arc" || critical === "Corrode") {
			var num, die;
			switch (level) {
				case 1: case 2: case 3: case 4: case 5: case 6:
				case 7: case 8:
					num = 1;
					die = randomChoice(["4", "6"]);
					break;
				case 9: case 10: case 11: case 12: case 13:
					num = 2;
					die = randomChoice(["4", "6", "8"]);
					break;
				case 14: case 15: case 16: case 17: case 18:
					num = 3;
					die = randomChoice(["4", "6", "8"]);
					break;
				case 19: case 20:
					num = 4;
					die = randomChoice(["4", "6", "8"]);
					break;
				default:
					console.error("Invalid level when trying to determine critical for sniper weapon.");
					num = "?";
					die = "?";
			}
			critical = critical + " " + num + "d" + die;
		}

		print("Level " + printLevel + " " + gunName);
		print("Sniper - two-handed");
		print("");
		print("Damage: " + damage);
		print("Range: " + rangeo + " ft.");
		print("Critical: " + critical);
		print("Capacity: " + ammo[0]);
		print("Usage: " + ammo[1]);

		special = removeBlankValues(special);
		var printSpecial = special.join(", ");
		print("Special: " + printSpecial);
		print("Bulk: " + bulk);
	}

	function generateSmallArm() {
		clearOutput();
		var level = getRandomInt(1, 20);
		smallArm(level);
	}

	function generateLongarm() {
		clearOutput();
		var level = getRandomInt(1, 20);
		longarm(level);
	}

	function generateHeavyWeapon() {
		clearOutput();
		var level = getRandomInt(1, 20);
		heavyWeapon(level);
	}

	function generateSniperWeapon() {
		clearOutput();
		var level = getRandomInt(1, 20);
		sniperWeapon(level);
	}

	function generateRandomWeapon() {
		clearOutput();
		var level = getRandomInt(1, 20);
		var weaponType = randomChoice(["small arm", "longarm", "heavy weapon", "sniper weapon"]);
		switch (weaponType) {
			case "small arm":
				smallArm(level);
				break;
			case "longarm":
				longarm(level);
				break;
			case "heavy weapon":
				heavyWeapon(level);
				break;
			case "sniper weapon":
				sniperWeapon(level);
				break;
			default:
				console.error("Invalide type of weapon to generate.");
		}
	}

	$(document).ready(function () {
		$("#generateSmallArm").on("click", generateSmallArm);
		$("#generateLongarm").on("click", generateLongarm);
		$("#generateHeavyWeapon").on("click", generateHeavyWeapon);
		$("#generateSniperWeapon").on("click", generateSniperWeapon);
		$("#generateRandomWeapon").on("click", generateRandomWeapon);
	});
})(jQuery);
