import * as Phaser from 'phaser-ce';
import {Create} from "../state/Create";

export class Game implements Create {
  game: Phaser.Game;

  constructor(private canvasId: String, private stateFunctions: any) {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, this.canvasId, this.stateFunctions);
  }

  create(): void {
    this.game.world.setBounds(0, 0, 800, 600);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;
    this.game.physics.p2.updateBoundsCollisionGroup();
    this.game.stage.backgroundColor = '#4dbd33';
  }

  getLoader(): Phaser.Loader {
    return this.game.load;
  }

}
