import Screen from "../classes/screen.js";
import clover_1 from "../textures/clover_1.js";
import stone_wall_9 from "../textures/stone_wall_9.js";
import * as debug_map from "/public/src/maps/debug_map.js";
import demo_brick from "/public/src/textures/demo_brick.js";

let screen = null;
let player = null;

let rayCasting = {
  incrementAngle: null,
  precision: 64,
};

let keyboard = {
  w: false,
  s: false,
  a: false,
  d: false,
  ArrowLeft: false,
  ArrowLeft: false,
};

let maps = [
  {
    id: 0,
    data: debug_map.data,
  },
];
let current_map = maps[0].data;
const SetCurrentMap = (id) => {
  let map = maps.find((x) => x.id === id);
  if (!id) throw `Cant find ${id} map`;
  current_map = map;
};

let textures = [new demo_brick(), new stone_wall_9(), new clover_1()];
let current_floor = textures.find((x) => x.name === "101");
const SetCurrentFloor = (name) => {
  let floor = textures.find((x) => x.name === name);
  if (!floor) throw `Cant find ${name} texture`;
  current_floor = floor;
};
export default {
  screen,
  player,
  rayCasting,
  keyboard,
  current_map,
  maps,
  textures,
  SetCurrentMap,
  current_floor,
  SetCurrentFloor,
};
