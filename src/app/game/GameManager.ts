import {Game} from "./objects/Game";
import {Ball} from "./objects/Ball";
import {Player} from "./objects/Player";

export class GameManager {

  game: Game;
  ball: Ball;
  player: Player;

  constructor(private canvasId: string) {
    const gameManager = this;
    this.game = new Game(this.canvasId, {
      preload: () => this.preload.call(gameManager),
      create: () => this.create.call(gameManager),
      update: () => this.update.call(gameManager),
      render: () => this.render.call(gameManager)
    });
    this.ball = new Ball(this.game);
    this.player = new Player(this.game);
  }

  preload(this: GameManager): void {
    console.log(this);
    this.ball.onPreload();
    this.player.onPreload();
  }

  create(this: GameManager): void {
    this.game.onCreate();
    // let playerCollisionGroup = this.game.getPhysics().createCollisionGroup();
    // let ballCollisionGroup = this.game.getPhysics().createCollisionGroup();

    this.ball.onCreate();

    this.player.onCreate();
    // this.playerBody().onBeginContact.add(this.touchBall, this);

    // this.game.getPhysics().boundsCollidesWith

    // this.spaceButton = this.game.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }


  render(this: GameManager): void {
    // this.game.game.debug.geom(this.ball, '#fffff');
  }

  update(this: GameManager): void {
    this.player.onUpdate();
  }
}
