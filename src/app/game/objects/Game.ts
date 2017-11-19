import * as Phaser from 'phaser-ce';
import {Create} from "../state/Create";

export class Game implements Create {

  private game: Phaser.Game;
  private cursor: Phaser.CursorKeys;

  constructor(private canvasId: String, private stateFunctions: any) {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, this.canvasId, stateFunctions);
  }

  onCreate(): void {
    this.game.world.setBounds(0, 0, 800, 600);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.updateBoundsCollisionGroup();
    this.game.stage.backgroundColor = '#4dbd33';

    this.cursor = this.game.input.keyboard.createCursorKeys()
  }

  getLoader(): Phaser.Loader {
    return this.game.load;
  }

  getPhysics(): Phaser.Physics.P2 {
    return this.game.physics.p2;
  }

  addSprite(startPositionX: number, startPositionY: number, spriteKey: string): Phaser.Sprite {
    return this.game.add.sprite(startPositionX, startPositionY, spriteKey);
  }

  getWorld(): Phaser.World {
    return this.game.world;
  }

  getCursorKeys(): Phaser.CursorKeys {
    return this.cursor;
  }
}
