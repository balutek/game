import * as Phaser from 'phaser-ce';

import {Create} from "../state/Create";
import {Preload} from "../state/Preload";
import {BasicObject} from "./BasicObject";

export class Player extends BasicObject implements Preload, Create {

  private imageKey: string = 'player';

  private playerSprite: Phaser.Sprite;

  getBody(): Phaser.Physics.P2.Body{
    return this.playerSprite.body;
  }

  onPreload(): void {
    this.game.getLoader().image(this.imageKey, '../assets/kao2.png');
  }

  onCreate(): void {
    this.playerSprite = this.game.addSprite(this.startX, this.startY, this.imageKey);
    this.game.getPhysics().enable(this.playerSprite);

    this.getBody().setCircle(24);
    this.getBody().angle = -90;
    this.getBody().mass = 3;

    this.initCollisionGroup();
  }

}
