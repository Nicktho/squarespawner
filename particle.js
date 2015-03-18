var Particle = function(x, y, speed, direction, grav) {
  // Init
  var pos = Vector(x, y);
  var vel = Vector(0, 0);
  vel.setLength(speed);
  vel.setAngle(direction);

  var gravity = Vector(0, grav || 0);


  return {
    pos: pos,
    vel: vel,
    gravity: gravity,

    update: function() {
      this.vel.addTo(this.gravity);
      this.pos.addTo(this.vel);
    },

    accelerate: function(accel) {
      this.vel.addTo(accel)
    }
  }
}
