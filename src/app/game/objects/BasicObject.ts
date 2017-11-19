import * as Phaser from 'phaser-ce';

import {Collidable} from "./Collidable";
import {Game} from "./Game";

export abstract class BasicObject implements Collidable {

  protected startX: number;
  protected startY: number;

  protected collisionGroup: Phaser.Physics.P2.CollisionGroup;

  constructor(protected game: Game){}

  setInitialiPosition(startX: number, startY: number) {
    this.startX = startX;
    this.startY = startY;
  }

  abstract getBody(): Phaser.Physics.P2.Body

  initCollisionGroup(): void {
    this.collisionGroup = this.game.getPhysics().createCollisionGroup();
    this.getBody().setCollisionGroup(this.collisionGroup);
  }

  getCollisionGroup(): Phaser.Physics.P2.CollisionGroup {
    return this.collisionGroup;
  }

  collidesWith(collidable: Collidable) {
    this.getBody().collides(collidable.getCollisionGroup(), () => this.onCollision(collidable));
  }

  onCollision(collided: Collidable): void {
    // noop
  }
}
