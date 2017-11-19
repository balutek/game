import * as Phaser from 'phaser-ce';
import {BasicObject} from "./BasicObject";

export interface Collidable {
  getBody(): Phaser.Physics.P2.Body;
  initCollisionGroup(): void;
  getCollisionGroup(): Phaser.Physics.P2.CollisionGroup;
  collidesWith(collidable: Collidable, collisionCallback?: () => void);
  onCollision(collided: Collidable);
}
