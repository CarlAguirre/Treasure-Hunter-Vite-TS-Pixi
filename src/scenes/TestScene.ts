import { AnimatedSprite, Assets, Container, Ticker } from "pixi.js";
//import { IScene } from "./Manager";

export class TestScene extends Container {
  animation: AnimatedSprite;

  constructor() {
    super();

    this.animation = AnimatedSprite.fromFrames(
      Assets.cache.get("bloobJason").data.animations["bloob"]
    );
    this.animation.play();
    this.animation.animationSpeed = 0.1;
    this.animation.loop = true;

    this.addChild(this.animation);
    console.log(this.animation);

    Ticker.shared.add(this.update, this);
  }
  public update(deltaTime: number) {
    this.animation.update(deltaTime);
  }
}
