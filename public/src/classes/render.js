export default class Render {
  constructor(
    width,
    height,
    container = "canvas-container",
    scale = 4,
    frameInterval = null,
    buffer = null,
    imageData = null
  ) {
    this.width = width;
    this.height = height;
    this.scale = scale;

    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    this.frameInterval = frameInterval;
    this.lastUpdate = null;
    this.buffer = buffer;
    this.imageData = imageData;

    this.canvas = null;
    this.context = null;
    this.container = container;
  }

  InitCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.border = "1px solid black";

    this.context = this.canvas.getContext("2d");

    this.context.scale(this.scale, this.scale);
    this.context.translate(0.5, 0.5);
    this.context.imageSmoothingEnabled = false;
    document.getElementById(this.container).appendChild(this.canvas);
  }

  setImageData(imageData) {
    this.imageData = imageData;
  }

  setBuffer(buffer) {
    this.buffer = buffer;
  }
}
