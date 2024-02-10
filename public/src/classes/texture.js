import { ParseImageData } from "../utils.js";

export default class texture {
  constructor(name, id, width, height, data) {
    this.name = name;
    this.id = id;
    this.width = width;
    this.height = height;
    this.data = data;
    this.texturePositionX = null;
  }

  LoadTexture() {
    let image = document.getElementById(this.id);
    if (!image) {
      console.log(
        `Error loading ${this.name} texture | Cant find <img> element with id ${this.id}`
      );
      return;
    }

    let canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.getContext("2d").drawImage(image, 0, 0, this.width, this.height);
    this.data = ParseImageData(
      canvas.getContext("2d").getImageData(0, 0, this.width, this.height).data
    );
  }

  GetColor(index) {
    return this.data[this.texturePositionX + index * this.width];
  }
}
