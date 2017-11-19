import * as _ from 'lodash';

import {Player} from "./Player";
import {Update} from "../state/Update";

export class PlayablePlayer extends Player implements Update {

  private possibleMoves = [
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

  private cursor: Phaser.CursorKeys;

  onCreate(): void {
    super.onCreate();
    this.cursor = this.game.getCursorKeys();
  }

  onUpdate(): void {
    const currentAngle = this.getBody().angle;
    const desiredAngle = this.calculateDesiredAngle();

    if (desiredAngle) {
      this.getBody().setZeroRotation();
      this.getBody().angle += this.calculateAngleChange(currentAngle, desiredAngle.angle);
      this.getBody().thrust(1000);
    }
  }

  private calculateDesiredAngle() {
    const currentMove = {
      up: this.cursor.up.isDown,
      down: this.cursor.down.isDown,
      right: this.cursor.right.isDown,
      left: this.cursor.left.isDown
    };

    return _.find(this.possibleMoves, possibleMove => _.isMatch(possibleMove, currentMove));
  }

  private calculateAngleChange(currentAngle, desiredAngle) {
    const diff = desiredAngle - currentAngle;
    if (diff > 180 || diff < -180) {
      const shorterAngle = 360 - Math.abs(diff);
      return - Math.min(shorterAngle, 5) * Math.sign(diff);
    } else {
      return Math.min(5, Math.abs(diff)) * Math.sign(diff);
    }
  }
}
