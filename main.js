window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;


	var ship = Particle(width / 2, height / 2, 0, 0);
	var thrust = Vector(0, 0);
	var angle = 0;

	var turningLeft = false,
			turningRight = false,
			thrusting = false;

	var canShoot = true;

	var bullets = [];

	update();

	document.body.addEventListener("keydown", function(e) {
		switch(e.keyCode) {
			case 38: // up
				thrusting = true;
				break;

			case 37: // left
				turningLeft = true;
				break;

			case 39: // right
				turningRight = true;
				break;

			case 32: // spacebar
				if (canShoot) {
					canShoot = false;
				}
				break;
		};
	});
	document.body.addEventListener("keyup", function(e) {
		switch(e.keyCode) {
			case 38: // up
				thrusting = false;
				break;

			case 37: // left
				turningLeft = false;
				break;

			case 39: // right
				turningRight = false;
				break;

			case 32: // spacebar
				canShoot = true;
				break;

		}
	});


	function update() {
		context.clearRect(0, 0, width, height);

		if(turningLeft) {
			angle -= 0.05;
		}

		if(turningRight) {
			angle += 0.05
		}

		thrust.setAngle(angle);

		if(thrusting) {
			thrust.setLength(0.1);
		} else {
			thrust.setLength(0);
		}

		if(!canShoot) {
			bullets.push(Particle(ship.pos.getX(), ship.pos.getY(), 5, angle, 0))
		}

		bullets.forEach(function(bullet, i) {
			bullet.update();
			context.save();
			context.translate(bullet.pos.getX(), bullet.pos.getY());
			context.rotate(bullet.pos.getAngle())
			context.strokeRect(0,0, 100, 100)
			context.restore();
			if(bullet.pos.getX() > width || bullet.pos.getX() < 0 || bullet.pos.getY() > height || bullet.pos.getY() < 0) {
				delete bullets[i]
			}
		})

		ship.accelerate(thrust);
		ship.update();

		context.save();
		context.translate(ship.pos.getX(), ship.pos.getY());
		context.rotate(angle);

		context.beginPath();
		context.moveTo(10, 0);
		context.lineTo(-10, -7);
		context.lineTo(-10, 7);
		context.lineTo(10, 0);
		if(thrusting) {
			context.moveTo(-10, 0);
			context.lineTo(-18, 0);
		}
		context.stroke();

		context.restore();

		if(ship.pos.getX() > width) {
			ship.pos.setX(0)
		}

		if(ship.pos.getX() < 0) {
			ship.pos.setX(width)
		}

		if(ship.pos.getY() > height) {
			ship.pos.setY(0)
		}

		if(ship.pos.getY() < 0) {
			ship.pos.setY(height)
		}

		requestAnimationFrame(update);
	}
};
