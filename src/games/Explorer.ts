import {
  Assets,
  Spritesheet,
  AnimatedSprite,
  Texture,
  Ticker,
  Graphics,
  Container,
} from "pixi.js";
import { IScene, Manager } from "../scenes/Manager";
import { contain } from "../utils/PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";

export class Explorer extends Container implements IScene {
  //private static readonly MOVE_SPEED = 350;

  explorer: AnimatedSprite;
  private explorerWlkD: AnimatedSprite;
  private explorerWlkU: AnimatedSprite;
  private standUp: AnimatedSprite;

  private explorerWlkL: AnimatedSprite;

  private standLeft: AnimatedSprite;

  private standRight: AnimatedSprite;

  private explorerWlkR: AnimatedSprite;
  // @ts-ignore
  private playerSheet: any = {};
  // @ts-ignore
  private sheet: Spritesheet;
  // @ts-ignore
  private hitbox: Graphics;

  constructor() {
    super();

    const standDown =
      Assets.cache.get("explorerJson").data.animations["explorer/walkStand"];
    //this.explorerWlkD = AnimatedSprite.fromFrames(standDown);

    //this.explorer = new AnimatedSprite([Texture.from("explorer")]);
    this.explorer = AnimatedSprite.fromFrames(standDown);

    this.standLeft = new AnimatedSprite([Texture.from("explorer/l0_04.png")]);
    this.standLeft.visible = false;

    this.standRight = new AnimatedSprite([Texture.from("explorer/l0_07.png")]);
    this.standRight.visible = false;

    this.standUp = new AnimatedSprite([Texture.from("explorer/l0_010.png")]);
    this.standUp.visible = false;

    this.explorer.x = 50;
    this.explorer.y = Manager.height / 2;
    // @ts-ignore
    this.explorer.vx = 0;
    // @ts-ignore
    this.explorer.vy = 0;
    this.explorer.animationSpeed = 0.1;
    this.explorer.play();
    this.explorer.loop = false;

    // EXPLORADOR CAMINANDO HACIA ABAJO
    const wlkDown =
      Assets.cache.get("explorerJson").data.animations["explorer/walkDown"];
    console.log(wlkDown);
    this.explorerWlkD = AnimatedSprite.fromFrames(wlkDown);
    this.explorerWlkD.play();
    this.explorerWlkD.visible = false;
    this.explorerWlkD.animationSpeed = 0.1;

    // EXPLORADOR CAMINANDO HACIA ARRIBA
    this.explorerWlkU = AnimatedSprite.fromFrames(
      Assets.cache.get("explorerJson").data.animations["explorer/walkUp"]
    );
    this.explorerWlkU.play();
    this.explorerWlkU.visible = false;
    this.explorerWlkU.animationSpeed = 0.1;

    // EXPLORADOR CAMINANDO HACIA LA IZQUIERDA
    const wlkLeft =
      Assets.cache.get("explorerJson").data.animations["explorer/walkLeft"];
    this.explorerWlkL = AnimatedSprite.fromFrames(wlkLeft);
    this.explorerWlkL.play();
    this.explorerWlkL.loop = true;
    this.explorerWlkL.visible = false;
    this.explorerWlkL.animationSpeed = 0.1;

    // EXPLORADOR CAMINANDO HACIA LA DERECHA
    const wlkRight =
      Assets.cache.get("explorerJson").data.animations["explorer/walkRight"];
    this.explorerWlkR = AnimatedSprite.fromFrames(wlkRight);
    this.explorerWlkR.play();
    this.explorerWlkR.visible = false;
    this.explorerWlkR.animationSpeed = 0.1;

    this.addChild(
      this.explorer,
      this.explorerWlkD,
      this.explorerWlkL,
      this.explorerWlkU,
      this.explorerWlkR,
      this.standLeft,
      this.standRight,
      this.standUp
    );

    this.keydefinition();
    Ticker.shared.add(this.update, this);
  }
  /*  getHitBox(): Rectangle {
    return this.hitbox.getBounds();  *******************************************
  } */

  public update(deltaTime: number) {
    // @ts-ignore
    //this.update(deltaTime);
    this.explorer.update(deltaTime);
    this.play();
    /* console.log("ex", this.explorer.x);
    console.log("ey", this.explorer.y); */
  }
  private play(): void {
    //@ts-ignore
    this.explorer.x += this.explorer.vx;
    //@ts-ignore
    this.explorer.y += this.explorer.vy;

    contain(this.explorer, {
      x: 28,
      y: 10,
      width: 488,
      height: 480,
    });
  }

  keydefinition() {
    const left = Keyboard(37),
      up = Keyboard(38),
      right = Keyboard(39),
      down = Keyboard(40);

    /* const left = new Keyboard("ArrowLeft", true);
    const up = new Keyboard("ArrowUp", true);
    const right = new Keyboard("ArrowRight", true);
    const down = new Keyboard("ArrowDown", true); */

    right.press = () => {
      //console.log("derecha");

      this.explorer.textures = this.explorerWlkR.textures;
      this.explorer.play();
      this.explorer.loop = true;
      //@ts-ignore
      this.explorer.vx = 3;
      //@ts-ignore
      this.explorer.vy = 0;
    };
    right.release = () => {
      //console.log("release");
      this.explorer.textures = this.standRight.textures;
      this.explorer.loop = false;
      //@ts-ignore
      this.explorer.vx = 0;
      //@ts-ignore
      this.explorer.vy = 0;
    };

    left.press = () => {
      this.explorer.textures = this.explorerWlkL.textures;
      this.explorer.play();
      this.explorer.loop = true;
      //@ts-ignore
      this.explorer.vx = -3;
      //@ts-ignore
      this.explorer.vy = 0;
    };
    left.release = () => {
      this.explorer.textures = this.standLeft.textures;
      this.explorer.loop = false;
      //@ts-ignore
      this.explorer.vx = 0;
      //@ts-ignore
      this.explorer.vy = 0;
    };

    up.press = () => {
      this.explorer.textures = this.explorerWlkU.textures;
      this.explorer.play();
      this.explorer.loop = true;
      //@ts-ignore
      this.explorer.vx = 0;
      //@ts-ignore
      this.explorer.vy = -3;
    };
    up.release = () => {
      this.explorer.textures = this.standUp.textures;
      this.explorer.loop = false;
      //@ts-ignore
      this.explorer.vx = 0;
      //@ts-ignore
      this.explorer.vy = 0;
    };

    down.press = () => {
      this.explorer.textures = this.explorerWlkD.textures;
      this.explorer.play();
      this.explorer.loop = true;
      //@ts-ignore
      this.explorer.vx = 0;
      //@ts-ignore
      this.explorer.vy = 3;
    };
    down.release = () => {
      this.explorer.textures = this.explorer.textures;
      this.explorer.loop = true;
      //@ts-ignore
      this.explorer.vx = 0;
      //@ts-ignore
      this.explorer.vy = 0;
    };
  }

  getPositionX() {
    return this.explorer.x;
  }
  getPositionY() {
    return this.explorer.y;
  }
  setPositionY(y: number) {
    this.explorer.y = y;
  }
  setPositionX(x: number) {
    this.explorer.x = x;
  }

  setAlpha(x: number) {
    this.explorer.alpha = x;
  }
}
