import {AfterViewInit, Component} from '@angular/core';

import * as Phaser from 'phaser-ce';

import * as _ from 'lodash';
import {Game} from "./game/objects/Game";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  spaceButton: Phaser.Key;
  player: Phaser.Sprite;
  game: Game;
  ball: Phaser.Sprite;
  cursor: Phaser.CursorKeys;

  ngAfterViewInit(): void {
    let component = this;
    this.game = new Game('game', {
      preload: () => this.preload.call(component),
      create: () => this.create.call(component),
      update: () => this.update.call(component),
      render: () => this.render.call(component) });
  }

  preload(this: AppComponent): void {
    this.game.getLoader().image('ball', 'assets/ball_small.png');
    this.game.getLoader().image('player', 'assets/kao2.png');
  }

  create(this: AppComponent): void {
    this.game.create();
    // let playerCollisionGroup = this.game.game.physics.p2.createCollisionGroup();
    // let ballCollisionGroup = this.game.game.physics.p2.createCollisionGroup();

    this.ball = this.game.game.add.sprite(this.game.game.world.centerX, this.game.game.world.centerY, 'ball');
    this.game.game.physics.p2.enable(this.ball);
    this.ball.body.setCircle(18);
    // this.ball.checkWorldBounds = true;
    // this.ball.body.setCollisionGroup(ballCollisionGroup);
    // this.ball.body.collides(playerCollisionGroup);

    this.player = this.game.game.add.sprite(this.game.game.world.centerX+50, this.game.game.world.centerY, 'player');
    this.game.game.physics.p2.enable(this.player);
    this.playerBody().mass = 10;
    this.playerBody().setCircle(24);
    this.playerBody().collides(this.game.game.physics.p2.everythingCollisionGroup);
    // this.player.checkWorldBounds = true;
    // this.playerBody().setCollisionGroup(playerCollisionGroup);
    // this.playerBody().collides(ballCollisionGroup);
    this.playerBody().onBeginContact.add(this.touchBall, this);

    // this.game.game.physics.p2.boundsCollidesWith

    this.cursor = this.game.game.input.keyboard.createCursorKeys();
    this.spaceButton = this.game.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  touchBall(player : Phaser.Physics.P2.Body, ball : any, sth: any, sth1: any, sth2: any): void {
    if(this.spaceButton.isDown) {
      console.log(player, ball, sth, sth2, sth2);
      // ball.applyForce([1], 100, 100);
    }
  }

  render(this: AppComponent): void {
    // this.game.game.debug.geom(this.ball, '#fffff');
  }

  update(this: AppComponent): void {

    const currentAngle = this.playerBody().angle;
    const desiredAngle = this.calculateDesiredAngle();

    if (desiredAngle) {
      this.playerBody().setZeroRotation();
      this.playerBody().angle += this.calculateAngleChange(currentAngle, desiredAngle.angle);
      this.playerBody().thrust(1000);
    }
  }

  playerBody(): Phaser.Physics.P2.Body{
    return <Phaser.Physics.P2.Body> this.player.body;
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
