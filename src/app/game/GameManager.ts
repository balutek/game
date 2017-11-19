import {Game} from "./objects/Game";
import {Ball} from "./objects/Ball";
import {Player} from "./objects/Player";
import {PlayablePlayer} from "./objects/PlayablePlayer";

export class GameManager {

  game: Game;
  ball: Ball;
  player: Player;
  playablePlayer: PlayablePlayer;

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
    this.playablePlayer = new PlayablePlayer(this.game);
  }

  preload(this: GameManager): void {
    this.ball.onPreload();
    this.player.onPreload();
    this.playablePlayer.onPreload();

    let centerX = this.game.getWorld().centerX;
    let centerY = this.game.getWorld().centerY;

    this.ball.setInitialiPosition(centerX, centerY);
    this.player.setInitialiPosition(centerX + 50, centerY);
    this.playablePlayer.setInitialiPosition(centerX + 50, centerY - 50);
  }

  create(this: GameManager): void {
    this.game.onCreate();

    this.ball.onCreate();
    this.player.onCreate();
    this.playablePlayer.onCreate();

    this.player.collidesWith(this.ball);
    this.player.collidesWith(this.playablePlayer);
    this.ball.collidesWith(this.player);
    this.ball.collidesWith(this.playablePlayer);
    this.playablePlayer.collidesWith(this.ball);
    this.playablePlayer.collidesWith(this.player);

    console.log(this);

  }


  render(this: GameManager): void {
    // this.game.game.debug.geom(this.ball, '#fffff');
  }

  update(this: GameManager): void {
    this.playablePlayer.onUpdate();
  }
}
