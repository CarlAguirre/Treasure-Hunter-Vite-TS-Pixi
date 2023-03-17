import { AnimatedSprite, Container, Texture, Ticker } from "pixi.js";
import { Manager } from "../scenes/Manager";
import { randomInt } from "../utils/Ramdom";
import { contain } from "../utils/PhysicsContainer";

export class Bloobs extends Container {
  bloobs: any = [];
  private blobHitsWall: any;
  // @ts-ignore
  bloob: AnimatedSprite;
  // @ts-ignore
  private numberOfBlobs: number;

  constructor(nbloobs: number) {
    super();

    this.numberOfBlobs = nbloobs;
    this.bloobs = [];
    let spacing = 40,
      xOffset = 40,
      speed = 3,
      direction = 1;

    for (let i = 0; i < this.numberOfBlobs; i++) {
      const bloob = new AnimatedSprite([Texture.from("bloob")]);
      bloob.animationSpeed = 0.5;
      bloob.play();
      bloob.loop = true;

      let x = spacing * i + xOffset;
      let y: number = randomInt(0, Manager.height - bloob.height);
      bloob.x = x + 100;
      bloob.y = y;
      //@ts-ignore
      bloob.vy = speed * direction;

      //Reverse the direction for the next blob
      direction *= -1;

      //Push the blob into the `blobs` array

      this.bloobs.push(bloob);

      this.blobHitsWall = contain(bloob, {
        x: 28,
        y: 10,
        width: 488,
        height: 480,
      });
      // @ts-ignore
      this.addChild(bloob);
    }
    Ticker.shared.add(this.update, this);
  }

  public update(deltaTime: number) {
    //this.bloob.update(deltaTime);
    this.play(deltaTime);
  }

  private play(deltaTime: number): void {
    //let aBloob = this.bloob;

    // @ts-ignore
    this.bloobs.forEach((aBloob) => {
      //aBloob.update(deltaTime);
      //@ts-ignore
      aBloob.y += aBloob.vy;

      //Check the blob's screen boundaries
      const blobHitsWall = contain(aBloob, {
        x: 28,
        y: 10,
        width: 488,
        height: 480,
      });

      if (blobHitsWall === "top" || blobHitsWall === "bottom") {
        // @ts-ignore
        aBloob.vy *= -1;
        // @ts-ignore
        if (aBloob.vy < 0) {
          //blob.textures = bloobSheet.walkUp;
          aBloob.play();
          aBloob.loop = true;

          //blob.loop = true;
        } else {
          //blob.textures = bloobSheet.walkDown;
          aBloob.play();
          aBloob.loop = true;
        }
      }

      /* if (hitTestRectangle(explorer, blob)) {
        explorerHit = true;
      } */
    });
  }

  forEach(callback: Function) {
    this.bloobs.forEach(callback);
  }
}
