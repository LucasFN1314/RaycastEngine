import store from "../store/store.js";
import Entity from "./entity.js";
import { DegreeToRadians } from "../utils.js";

export default class Ray extends Entity {
  constructor(angle) {
    super();
    this.horizontalStep =
      Math.cos(DegreeToRadians(angle)) / store.rayCasting.precision;
    this.verticalStep =
      Math.sin(DegreeToRadians(angle)) / store.rayCasting.precision;

    this.collision = 0;
    this.distance = 0;
    this.angle = angle;
    this.texturePositionX = null;
  }

  Advance() {
    this.x += this.horizontalStep;
    this.y += this.verticalStep;
    this.collision = store.current_map[Math.floor(this.y)][Math.floor(this.x)];
  }

  HasCollision() {
    return this.collision != 0;
  }

  GetWall() {
    let texture = store.textures.find((x) => x.name == this.collision);
    texture.texturePositionX = Math.floor(
      (texture.width * (this.x + this.y)) % texture.width
    );
    return texture;
  }

  GetDistance(entity) {
    let distance =
      Math.sqrt(
        Math.pow(entity.x - this.x, 2) + Math.pow(entity.y - this.y, 2)
      ) * Math.cos(DegreeToRadians(this.angle - entity.angle));

    return distance;
  }
}
