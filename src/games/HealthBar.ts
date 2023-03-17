import { Container, Graphics } from "pixi.js";
import { Manager } from "../scenes/Manager";

export class HealthBar extends Container {
  healthBar: Container;
  innerBar: Graphics;
  outerBar: Graphics;

  constructor() {
    super();
    this.healthBar = new Container();
    this.healthBar.position.set(Manager.width - 170, 4);
    this.addChild(this.healthBar);

    this.innerBar = new Graphics();
    this.outerBar = new Graphics();
    this.innerBar.beginFill(0x000000);
    this.innerBar.drawRect(0, 0, 128, 8);
    this.innerBar.endFill();

    this.outerBar.beginFill(0xff3300);
    this.outerBar.drawRect(0, 0, 128, 8);
    this.outerBar.endFill();

    this.healthBar.addChild(this.innerBar, this.outerBar);

    //@ts-ignore
    this.healthBar.outer = this.outerBar;
  }

  getHealth() {
    //@ts-ignore
    return this.healthBar.outer.width;
  }

  setReduceHealth(value: number) {
    //@ts-ignore
    this.healthBar.outer.width = this.healthBar.outer.width - value;
  }
}
