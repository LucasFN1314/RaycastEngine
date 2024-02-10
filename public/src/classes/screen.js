import Render from "./render.js";
import Projection from "./projection.js";
import { DegreeToRadians } from "../utils.js";
import store from "../store/store.js";
export default class Screen extends Render {
  constructor(width, height, container, scale) {
    super(width, height, container, scale);
    this.projection = new Projection(
      this.width / this.scale,
      this.height / this.scale
    );
  }

  InitProjection() {
    this.projection.setImageData(
      this.context.createImageData(
        this.projection.width,
        this.projection.height
      )
    );

    this.projection.setBuffer(this.projection.imageData.data);
  }

  GetProjection() {
    return this.projection;
  }

  DrawPixel(x, y, color) {
    let offset = 4 * (Math.floor(x) + Math.floor(y) * this.projection.width);
    this.projection.buffer[offset] = color.r;
    this.projection.buffer[offset + 1] = color.g;
    this.projection.buffer[offset + 2] = color.b;
    this.projection.buffer[offset + 3] = color.a;
  }

  DrawLine(x, y1, y2, color) {
    for (let y = y1; y < y2; y++) {
      this.DrawPixel(x, y, color);
    }
  }

  DrawTexture(x, wallHeight, texture) {
    let yIncrementer = (wallHeight * 2) / texture.height;
    let y = this.projection.halfHeight - wallHeight;

    let color = null;
    for (let i = 0; i < texture.height; i++) {
      color = texture.GetColor(i);
      if (!color)
        throw `Cant get color from texture | ${texture?.id ?? texture}`;
      this.DrawLine(x, y, Math.floor(y + (yIncrementer + 2)), color);
      y += yIncrementer;
    }
  }

  DrawFloor(x1, wallHeight, rayAngle) {
    let start = this.projection.halfHeight + wallHeight + 1;
    let dirCos = Math.cos(DegreeToRadians(rayAngle));
    let dirSin = Math.sin(DegreeToRadians(rayAngle));

    for (let y = start; y < this.projection.height; y++) {
      let distance =
        this.projection.height /
        (2 * y - this.projection.height) /
        Math.cos(
          DegreeToRadians(store.player.angle) - DegreeToRadians(rayAngle)
        );
      let tileX = distance * dirCos + store.player.x;
      let tileY = distance * dirSin + store.player.y;
      let texture = store.current_floor;

      let texture_x = Math.floor(tileX * texture.width) % texture.width;
      let texture_y = Math.floor(tileY * texture.height) % texture.height;

      let color = texture.data[texture_x + texture_y * texture.width];
      this.DrawPixel(x1, y, color);
    }
  }

  RenderBuffer() {
    let canvas = document.createElement("canvas");
    canvas.width = this.projection.width;
    canvas.height = this.projection.height;
    canvas.getContext("2d").putImageData(this.projection.imageData, 0, 0);
    this.context.drawImage(canvas, 0, 0);
  }

  Clear() {
    for (let i = 0; i < this.GetProjection().buffer.length; i += 4) {
      this.projection.buffer[i] = 0;
      this.projection.buffer[i + 1] = 0;
      this.projection.buffer[i + 2] = 0;
      this.projection.buffer[i + 3] = 255;
    }
    this.projection.imageData.data.set(this.projection.buffer);
  }
}
