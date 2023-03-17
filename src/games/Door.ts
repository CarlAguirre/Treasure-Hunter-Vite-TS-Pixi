import { Assets, Sprite, Container } from "pixi.js";
//import { IHitBox } from "./IHitBox";
//import { Manager } from "../scenes/Manager";

export class Door extends Container {
  // @ts-ignore
  private door: Sprite;

  constructor() {
    super();

    this.door = Sprite.from(Assets.cache.get("door"));
    this.door.x = 32;
    this.door.y = 3;
    this.addChild(this.door);
  }
}
