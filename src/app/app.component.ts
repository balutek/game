import {AfterViewInit, Component} from '@angular/core';

import * as Phaser from 'phaser-ce';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  player: Phaser.Sprite;
  game: Phaser.Game;
  ball: Phaser.Sprite;
  cursor: Phaser.CursorKeys;

  ngAfterViewInit(): void {
    let component = this;
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
      preload: () => this.preload.call(component),
      create: () => this.create.call(component),
      update: () => this.update.call(component),
      render: () => this.render.call(component) });
  }

  preload(this: AppComponent): void {
    this.game.load.image('ball', 'assets/ball_small.png');
    this.game.load.image('arrowUp', 'assets/arrow_up.png');
  }

  create(this: AppComponent): void {
    this.game.world.setBounds(0, 0, 800, 600);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.stage.backgroundColor = '#4dbd33';

    this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
    this.game.physics.p2.enable(this.ball);
    this.ball.body.setCircle(18);

    this.player = this.game.add.sprite(this.game.world.centerX+50, this.game.world.centerY, 'arrowUp');
    this.game.physics.p2.enable(this.player);
    this.player.body.setRectangle(48, 48);

    this.cursor = this.game.input.keyboard.createCursorKeys();
  }

  render(this: AppComponent): void {
    // this.game.debug.geom(this.ball, '#fffff');
  }

  update(this: AppComponent): void {

    const currentAngle = this.playerBody().angle;
    const desiredAngle = this.calculateDesiredAngle();

    if (desiredAngle) {
      this.playerBody().angle += this.calculateAngleChange(currentAngle, desiredAngle.angle);
      this.playerBody().thrust(100);
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
