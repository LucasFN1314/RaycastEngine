import Player from "./player.js";
import Ray from "./ray.js";
import store from "../store/store.js";
import { DegreeToRadians } from "../utils.js";
export default class Viewer extends Player {
  constructor() {
    super();
  }

  RayCast() {
    let rayAngle = this.angle - this.halfFov;
    for (
      let rayCount = 0;
      rayCount < store.screen.projection.width;
      rayCount++
    ) {
      let ray = new Ray(rayAngle);
      ray.x = this.x;
      ray.y = this.y;

      while (!ray.HasCollision()) {
        ray.Advance();
      }

      let distance = ray.GetDistance(this);
      let wallHeight = Math.floor(
        store.screen.GetProjection().halfHeight / distance
      );

      let texture = ray.GetWall();
      store.screen.DrawTexture(rayCount, wallHeight, texture);
      store.screen.DrawFloor(rayCount, wallHeight, rayAngle);
      rayAngle += store.rayCasting.incrementAngle;
    }
  }

  Variation() {
    let left = store.keyboard[this.Movekeys.left];
    let right = store.keyboard[this.Movekeys.right];
    let up = store.keyboard[this.Movekeys.up];
    let down = store.keyboard[this.Movekeys.down];

    this.movement.x = left === true ? 1 : right === true ? -1 : 0;
    this.movement.y = up === true ? 1 : down === true ? -1 : 0;
  }

  Movement() {
    let movementCos =
      Math.cos(DegreeToRadians(this.angle)) * this.speed.movement;

    let movementSin =
      Math.sin(DegreeToRadians(this.angle)) * this.speed.movement;

    if (this.movement.x === 0 && this.movement.y === 0) return;

    let newX = this.x + movementCos * this.movement.y;
    let newY = this.y + movementSin * this.movement.y;

    let checkX = Math.floor(newX + movementCos * this.movement.y * this.radius);
    let checkY = Math.floor(newY + movementSin * this.movement.y * this.radius);

    if (this.CollisionCheckY(checkY)) this.y = newY;
    if (this.CollisionCheckX(checkX)) this.x = newX;

    this.angle += this.movement.x * (-this.movement.y * this.speed.rotation);
    // this.angle += this.movement.x * -this.speed.rotation;
  }

  Rotate() {}

  CollisionCheckY(checkY) {
    return store.current_map[checkY][Math.floor(this.x)] === 0;
  }

  CollisionCheckX(checkX) {
    return store.current_map[Math.floor(this.y)][checkX] === 0;
  }

  Update() {
    this.Variation();
    this.Movement();
    this.Rotate();
    this.RayCast();
  }
}
