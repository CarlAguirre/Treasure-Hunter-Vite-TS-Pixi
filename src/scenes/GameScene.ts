import { sound } from "@pixi/sound";
import { Container, Sprite, Ticker } from "pixi.js";
import { Bloobs } from "../games/Bloobs";
import { Door } from "../games/Door";
import { Explorer } from "../games/Explorer";
import { checkCollision } from "../games/IHitBox";
import { Treasure } from "../games/Tresure";
import { HealthBar } from "../games/HealthBar";
import { IScene, Manager } from "./Manager";
import { EndScene } from "./EnsdScene";

export class GameScene extends Container implements IScene {
  private dungeon: Sprite;
  private playerExplorer: Explorer;
  private treasure: Treasure;
  private bloob: Bloobs;
  private door: Door;
  private healtbar: HealthBar;
  private state: string;

  constructor() {
    super();

    this.state = "play";
    sound.play("Underground", { volume: 0.2, loop: true });

    this.dungeon = Sprite.from("dungeon");
    this.dungeon.anchor.set(0.5);
    this.dungeon.x = Manager.width / 2;
    this.dungeon.y = Manager.height / 2;
    this.addChild(this.dungeon);

    this.playerExplorer = new Explorer();
    this.treasure = new Treasure();
    this.door = new Door();
    this.bloob = new Bloobs(7);
    this.healtbar = new HealthBar();

    this.addChild(
      this.healtbar,
      this.door,
      this.bloob,
      this.treasure,
      this.playerExplorer
    );

    let a = this.collition();
    console.log(a);

    this.gameLoaded(a);

    Ticker.shared.add(this.update, this);
  }
  // @ts-ignore
  public update(deltaTime: number): void {
    let state = this.collition();

    this.gameLoaded(state);
  }

  collition() {
    let explorerHit = false;
    if (checkCollision(this.playerExplorer, this.treasure)) {
      this.treasure.setPositionX(this.playerExplorer.getPositionX() + 8);
      this.treasure.setPositionY(this.playerExplorer.getPositionY() + 8);
    }

    //@ts-ignore
    this.bloob.forEach((bloob) => {
      if (checkCollision(this.playerExplorer, bloob)) {
        explorerHit = true;
      }
    });

    if (explorerHit) {
      this.playerExplorer.setAlpha(0.5);
      //@ts-ignore
      this.healtbar.setReduceHealth(1.2);
    } else {
      this.playerExplorer.setAlpha(1);
    }
    let state = this.state;
    if (checkCollision(this.door, this.treasure)) {
      state = "win";
    }
    //@ts-ignore
    if (this.healtbar.getHealth() <= 0) {
      state = "loose";
    }

    return state;
  }

  private gameLoaded(stateQ: string): void {
    // Change scene to the game scene!
    if (this.state === "play" && (stateQ === "win" || stateQ === "loose")) {
      this.state = stateQ;
      sound.stopAll();
      Manager.changeScene(new EndScene(this.state));
      //console.log("cambiando escena");
      this.destroy();
    }

    //console.log("this.state", this.state, "stateQ", stateQ, this);
  }
}
