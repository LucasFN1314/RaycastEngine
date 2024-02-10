export default class Entity {
  constructor(x = 0, y = 0, angle = 0, radius = 0) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = radius;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setAngle(angle) {
    this.angle = angle;
  }

  setRadius(size) {
    this.radius = size;
  }
}
