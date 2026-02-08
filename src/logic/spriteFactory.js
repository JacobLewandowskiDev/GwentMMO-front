// Background Assets
import map_img from "@/assets/images/gwent_tavern_map.png";
import map_fg_img from "@/assets/images/tavern_map_foreground.png";

export const map_imgSrc = map_img;
export const map_foreground_imgSrc = map_fg_img;

// Profile Sprites Mapping
// We import them at the top so Vite can bundle them correctly
import p1_up from "@/assets/images/charSprites/profile_1_up.png";
import p1_down from "@/assets/images/charSprites/profile_1_down.png";
import p1_left from "@/assets/images/charSprites/profile_1_left.png";
import p1_right from "@/assets/images/charSprites/profile_1_right.png";

import p2_up from "@/assets/images/charSprites/profile_2_up.png";
import p2_down from "@/assets/images/charSprites/profile_2_down.png";
import p2_left from "@/assets/images/charSprites/profile_2_left.png";
import p2_right from "@/assets/images/charSprites/profile_2_right.png";

// ... (Continue this pattern for profiles 3-6)

export const PROFILE_ASSETS = {
  1: { up: p1_up, down: p1_down, left: p1_left, right: p1_right },
  2: { up: p2_up, down: p2_down, left: p2_left, right: p2_right },
  // 3: { up: p3_up, ... }
};

// NPC Sprites
import n1_up from "@/assets/images/charSprites/npc_1_up.png";
import n1_down from "@/assets/images/charSprites/npc_1_down.png";
import n1_left from "@/assets/images/charSprites/npc_1_left.png";
import n1_right from "@/assets/images/charSprites/npc_1_right.png";

export const NPC_ASSETS = {
  npc_1: { up: n1_up, down: n1_down, left: n1_left, right: n1_right },
};

// Helper: Convert source to Image object
export function getImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

// Helper: Convert a set of paths to a set of Image objects
export function getSpriteSet(assetGroup, id) {
  const paths = assetGroup[id];
  if (!paths) return null;
  return {
    up: getImage(paths.up),
    down: getImage(paths.down),
    left: getImage(paths.left),
    right: getImage(paths.right),
  };
}