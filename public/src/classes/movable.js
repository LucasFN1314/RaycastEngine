import Entity from "./entity.js";
export default class Movable extends Entity {
  constructor(movementSpeed = 0, rotationSpeed = 0) {
    super();
    this.speed = {
      movement: movementSpeed,
      rotation: rotationSpeed,
    };
    this.movement = {
      x: 0,
      y: 0,
    };

    this.Movekeys = {
      up: null,
      down: null,
      left: null,
      right: null,
    };
  }

  setSpeed(movement, rotation) {
    this.speed = {
      movement: movement,
      rotation: rotation,
    };
  }

  setMovementKeys(up, down, left, right) {
    this.Movekeys = {
      up: up,
      down: down,
      left: left,
      right: right,
    };
  }

  setRotationKeys(left, right) {
    this.RotationKeys = {
      rotateLeft: left,
      rotateRight: right,
    };
  }

  MoveUp() {
    this.y += this.speed.movement;
  }

  MoveDown() {
    this.y -= this.speed.movement;
  }

  MoveLeft() {
    this.x += this.speed.movement;
  }

  MoveRight() {
    this.x -= this.speed.movement;
  }
}
