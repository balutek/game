import {Game} from "./Game";

import * as Phaser from 'phaser-ce';
import * as _ from 'lodash';

import {Create} from "../state/Create";
import {Update} from "../state/Update";
import {Preload} from "../state/Preload";

export class Player implements Preload, Create, Update {

  private imageKey: string = 'player';

  private playerSprite: Phaser.Sprite;
  private cursor: Phaser.CursorKeys;

  constructor(private game: Game) {
  }

  onPreload(): void {
    this.game.getLoader().image(this.imageKey, '../assets/kao2.png');
  }

  onCreate(): void {
    this.playerSprite = this.game.game.add.sprite(this.game.game.world.centerX, this.game.game.world.centerY, this.imageKey);
    this.game.getPhysics().enable(this.playerSprite);
    this.playerBody().mass = 0.8;
    this.playerBody().setCircle(24);
    this.playerBody().collides(this.game.getPhysics().everythingCollisionGroup);
    // this.player.checkWorldBounds = true;
    // this.playerBody().setCollisionGroup(playerCollisionGroup);
    // this.playerBody().collides(ballCollisionGroup);
    this.cursor = this.game.game.input.keyboard.createCursorKeys();
  }

  onUpdate(): void {
    const currentAngle = this.playerBody().angle;
    const desiredAngle = this.calculateDesiredAngle();

    if (desiredAngle) {
      this.playerBody().setZeroRotation();
      this.playerBody().angle += this.calculateAngleChange(currentAngle, desiredAngle.angle);
      this.playerBody().thrust(1000);
    }
  }

  playerBody(): Phaser.Physics.P2.Body{
    return <Phaser.Physics.P2.Body> this.playerSprite.body;
  }

  calculateDesiredAngle() {
    const possibleMoves = [
      { up : true, down: false, right: false, left: false, angle: 0},
      { up : true, down: false, right: true, left: true, angle: 0},
      { up : false, down: true, right: false, left: false, angle: 180},
      { up : false, down: true, right: true, left: true, angle: 180},
      { up : false, down: false, right: true, left: false, angle: 90},
      { up : true, down: true, right: true, left: false, angle: 90},
      { up : false, down: false, right: false, left: true, angle: -90},
      { up : true, down: true, right: false, left: true, angle: -90},
      { up : true, down: false, right: true, left: false, angle: 45},
      { up : true, down: false, right: false, left: true, angle: -45},
      { up : false, down: true, right: true, left: false, angle: 135},
      { up : false, down: true, right: false, left: true, angle: -135}
    ];

    const currentMove = {
      up : this.cursor.up.isDown,
      down: this.cursor.down.isDown,
      right: this.cursor.right.isDown,
      left: this.cursor.left.isDown
    };

    return _.find(possibleMoves, possibleMove => _.isMatch(possibleMove, currentMove));
  }

  calculateAngleChange(currentAngle, desiredAngle) {
    const diff = desiredAngle - currentAngle;
    if (diff > 180 || diff < -180) {
      const shorterAngle = 360 - Math.abs(diff);
      return - Math.min(shorterAngle, 5) * Math.sign(diff);
    } else {
      return Math.min(5, Math.abs(diff)) * Math.sign(diff);
    }
  }

}
