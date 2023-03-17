import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "elements",
      assets: {
        dungeon: "./images/dungeon.png",
        explorer: "./images/l0_01.png",
        treasure: "./images/treasure.png",
        bloob: "./images/bloob_00.png",
        door: "./images/door.png",
        cementery: "./images/cemetery.png",
        treasure_win: "./images/treasure_wins.png",
      },
    },
    {
      name: "fonts",
      assets: {
        PetMe: "./fonts/PetMe.ttf",
        puzzler: "./fonts/puzzler.otf",
        SpicyRice: "./fonts/SpicyRice.ttf",
      },
    },
    {
      name: "sounds",
      assets: {
        Underground: "./sound/12 - Underground Way.mp3",
        Morlia: "./sound/17 - Morlia Gallery.mp3",
        Awakening: "./sound/44 - Awakening.mp3",
        Sakuraba: "./sound/78 - Sakuraba Solo.mp3",
      },
    },
    {
      name: "sheets",
      assets: {
        tiles: "./images/treasure_hunter.json",
        explorerJson: "./images/Explorer.json",
        explorerSheet: "./images/Explorer.png",
        bloobJason: "./images/bloob.json",
        bloobSheet: "./images/bloob.png",
      },
    },
  ],
};
