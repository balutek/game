import {AfterViewInit, Component} from '@angular/core';

import * as Phaser from 'phaser-ce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  game: Phaser.Game;

  ngAfterViewInit(): void {
    this.game = new Phaser.Game('100', '100', Phaser.AUTO, 'game', { create: this.create, update: this.update });
  }

  create(): void {
    this.game.stage.backgroundColor = '#4dbd33';
  }

  update(): void {
    // noop
  }
}
