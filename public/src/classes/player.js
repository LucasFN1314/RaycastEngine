import Movable from "./movable.js";
export default class Player extends Movable {
  constructor() {
    super();
    this.fov = 0;
    this.halfFov = 0;
  }

  SetFov(fov) {
    this.fov = fov;
    this.halfFov = fov / 2;
  }
}
