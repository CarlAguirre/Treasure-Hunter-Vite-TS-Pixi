import { sound } from "@pixi/sound";
import { Container, TextStyle, Ticker, Text, Sprite } from "pixi.js";
import { Manager } from "./Manager";
import { TestScene } from "./TestScene";
//import { IScene, Manager } from "./Manager";

export class EndScene extends Container {
  text: Text;

  state: string = "ok";

  constructor(state: string) {
    super();
    sound.play("Sakuraba", { volume: 0.2 });
    console.log(state);

    const cementery = Sprite.from("cementery");
    cementery.scale.set(0.5);
    cementery.x = Manager.width / 2 - 200;
    cementery.y = 60;

    const treasure_wins = Sprite.from("treasure_win");

    treasure_wins.scale.set(0.5);
    treasure_wins.x = Manager.width / 2 - 200;
    treasure_wins.y = 60;

    /* this.block = new Graphics();

    this.block.beginFill(0xff0000);
    this.block.drawRoundedRect(80, 140, 341, 220, 10);
    this.block.endFill();

    //this.block.mask = cementery;

    this.addChild(this.block); */

    //console.log("Hola  final");

    const style = new TextStyle({
      align: "center",
      dropShadow: true,
      dropShadowAlpha: 0.8,
      fill: ["#000000", "#b20101"],
      fontFamily: "SpicyRice",
      fontSize: 41,
      miterLimit: 11,
      stroke: "#301212",
      strokeThickness: 3,
    });
    this.text = new Text("Fin del Juego!!!", style);

    this.text.x = 190;
    this.text.y = 308;

    if (state === "loose") {
      this.text.text = "Has Perdido!!!";
      this.addChild(cementery, this.text);
    }
    if (state === "win") {
      this.text.text = "Has Ganado!!!";
      this.addChild(treasure_wins, this.text);
    }

    //this.gameLoaded(stateQ);

    console.log("cambiando escena bloob");

    Ticker.shared.add(this.update, this);
  }
  //@ts-ignore
  update(framesPassed: number): void {
    let stateQ = "f";
    this.gameLoaded(stateQ);
  }

  private gameLoaded(stateQ: string): void {
    // Change scene to the game scene!
    if (this.state === "ok" && stateQ === "f") {
      this.state = stateQ;
      Manager.changeScene(new TestScene());
    }
    console.log("cambiando desde la escena final");
  }
}
