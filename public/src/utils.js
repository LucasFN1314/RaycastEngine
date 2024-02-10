import Color from "./classes/color.js";
export const ParseImageData = (imageData, factor = 4) => {
  let colorArray = [];
  for (let i = 0; i < imageData.length; i += factor) {
    colorArray.push(
      new Color(imageData[i], imageData[i + 1], imageData[i + 2], 255)
    );
  }
  return colorArray;
};

export const DegreeToRadians = (deg) => {
  return (deg * Math.PI) / 180;
};

