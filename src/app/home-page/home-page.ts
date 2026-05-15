import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TileService, TilesResponse } from '../services/tile-service';

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly tileConfig$?: Observable<TilesResponse>;

  constructor(tileService: TileService) {
    this.tileConfig$ = tileService.getTilesConfig$();
  }
}
