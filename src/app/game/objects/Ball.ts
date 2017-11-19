import * as Phaser from 'phaser-ce';

import {Create} from "../state/Create";
import {Preload} from "../state/Preload";
import {BasicObject} from "./BasicObject";

export class Ball extends BasicObject implements Preload, Create {

  private imageKey: string = 'ball';

  private ballSprite: Phaser.Sprite;

  onPreload(): void {
    this.game.getLoader().image(this.imageKey, '../assets/ball_small.png');
  }

  onCreate(): void {
    this.ballSprite = this.game.addSprite(this.startX, this.startY, this.imageKey);
    this.game.getPhysics().enable(this.ballSprite);

    this.getBody().setCircle(18);
    this.getBody().mass = 1;

    this.initCollisionGroup();
  }

  getBody(): Phaser.Physics.P2.Body {
    return this.ballSprite.body;
  }

  kick(): void {
    this.getBody().applyImpulseLocal([10, 10], 0, 0);
  }

}
