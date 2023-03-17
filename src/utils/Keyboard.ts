//import { utils } from "pixi.js";

export function Keyboard(keyCode: any) {
  let key: any = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //The `downHandler`
  //@ts-ignore
  key.downHandler = (event) => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  //@ts-ignore
  key.upHandler = (event) => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);

  //Return the key object
  return key;

  /*   public key: any = {};
  public value: any;
  public isDown: boolean;
  public isUp: boolean;
  public isAxisButton: boolean;
  constructor(value: any, isAxisButton: boolean) {
    this.value = value;
    this.isDown = false;
    this.isUp = true;
    this.isAxisButton = isAxisButton;
    this.subscribeEvents();
  }
  public subscribeEvents(): void {
    window.addEventListener("keydown", this.downHandler.bind(this));
    window.addEventListener("keyup", this.upHandler.bind(this));
  }
  public unSubscribeEvents(): void {
    window.removeEventListener("keydown", this.downHandler.bind(this));
    window.removeEventListener("keyup", this.upHandler.bind(this));
  }
  public downHandler(event: any): void {
    if (event.key === this.value) {
      this.press();
      event.preventDefault();
    }
  }
  public upHandler(event: any): void {
    if (event.key === this.value) {
      this.release();
      event.preventDefault();
    }
  }
  public press(): void {}
  public release(): void {} */
}
