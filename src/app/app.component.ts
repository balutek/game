import {AfterViewInit, Component} from '@angular/core';
import {GameManager} from "./game/GameManager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    new GameManager('game');
  }


}
