import Screen from "./public/src/classes/screen.js";
import Viewer from "./public/src/classes/viewer.js";
import store from "./public/src/store/store.js";

function LoadTextures() {
  store.textures.forEach((x) => x.LoadTexture());
}

function ConfigurePlayer() {
  let player = new Viewer();
  store.player = player;
  player.SetFov(60);
  player.setSpeed(0.1, 3.0);
  player.setPosition(4, 4);
  player.setAngle(90);
  player.setRadius(1);
  player.setMovementKeys("w", "s", "a", "d");
  player.setRotationKeys("ArrowLeft", "ArrowRight");
}

function ConfigureScreen() {
  let screen = new Screen(800, 600, "canvas-container", 1);
  screen.InitCanvas();
  screen.InitProjection();
  screen.frameInterval = 1000 / 16;
  store.screen = screen;
}

function KeyboardHandler() {
  document.addEventListener("keydown", (e) => {
    store.keyboard[e.key] = true;
  });

  document.addEventListener("keyup", (e) => {
    store.keyboard[e.key] = false;
  });
}

function Loop() {
  const render = (timestamp) => {
    if (
      !store.screen.lastUpdate ||
      timestamp - store.screen.lastUpdate > store.screen.frameInterval
    ) {
      store.screen.Clear();
      store.player.Update();
      store.screen.RenderBuffer();
    }
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

function Init() {
  ConfigureScreen();
  LoadTextures();
  ConfigurePlayer();
  KeyboardHandler();

  store.rayCasting.incrementAngle =
    store.player.fov / store.screen.projection.width;
  Loop();
}

window.onload = () => {
  Init();
};
