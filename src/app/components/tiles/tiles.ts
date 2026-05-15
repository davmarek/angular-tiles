import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TileService, TilesConfig } from '../../services/tile-service';
import { TilesSettings } from '../tiles-settings/tiles-settings';

@Component({
  selector: 'app-tiles',
  imports: [AsyncPipe, TilesSettings],
  templateUrl: './tiles.html',
  styleUrl: './tiles.scss',
})
export class Tiles {
  protected readonly tileConfig$?: Observable<TilesConfig>;
  protected isDebugMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    tileService: TileService,
  ) {
    this.tileConfig$ = tileService.getTilesConfig$();
    this.route.queryParams.subscribe((params) => {
      this.isDebugMode = params['mode'] === 'editor';
    });
  }
}
