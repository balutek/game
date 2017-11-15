import * as Phaser from 'phaser-ce';

import {Game} from "./Game";

import {Create} from "../state/Create";
import {Preload} from "../state/Preload";

export class Ball implements Preload, Create {

  private imageKey: string = 'ball';

  private ballSprite: Phaser.Sprite;

  constructor(private game: Game) {
  }

  onPreload(): void {
    this.game.getLoader().image(this.imageKey, '../assets/ball_small.png');
  }

  onCreate(): void {
    this.ballSprite = this.game.game.add.sprite(this.game.game.world.centerX, this.game.game.world.centerY, this.imageKey);
    this.game.getPhysics().enable(this.ballSprite);
    this.ballSprite.body.setCircle(18);
    // this.ball.body.setCollisionGroup(ballCollisionGroup);
    this.ballSprite.body.collides(this.game.getPhysics().everythingCollisionGroup);
  }
}
