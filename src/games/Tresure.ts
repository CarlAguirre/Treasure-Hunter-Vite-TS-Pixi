import { Assets, Sprite, Container } from "pixi.js";
//import { IHitBox } from "./IHitBox";
import { IScene, Manager } from "../scenes/Manager";

export class Treasure extends Container implements IScene {
  // @ts-ignore
  treasure: Sprite;

  constructor() {
    super();

    this.treasure = Sprite.from(Assets.cache.get("treasure"));
    this.treasure.x = 410;
    this.treasure.y = Manager.height / 2;
    this.addChild(this.treasure);
    // Ticker.shared.add(this.update, this);
  }
  public update(deltaTime: number) {
    // @ts-ignore
    //this.update(deltaTime);
    this.treasure.update(deltaTime);
  }

  getPositionX() {
    return this.treasure.x;
  }

  getPositionY() {
    return this.treasure.y;
  }
  setPositionY(y: number) {
    this.treasure.y = y;
  }
  setPositionX(x: number) {
    this.treasure.x = x;
  }
}
