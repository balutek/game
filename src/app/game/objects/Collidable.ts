import * as Phaser from 'phaser-ce';

export interface Collidable {
  getBody(): Phaser.Physics.P2.Body;
  initCollisionGroup(): void;
  getCollisionGroup(): Phaser.Physics.P2.CollisionGroup;
  collidesWith(collidable: Collidable);
}
