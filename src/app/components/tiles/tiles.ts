import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tile, TileService } from '../../services/tile-service';
import { TilesSettings } from '../tiles-settings/tiles-settings';

@Component({
  selector: 'app-tiles',
  imports: [AsyncPipe, TilesSettings],
  templateUrl: './tiles.html',
  styleUrl: './tiles.scss',
})
export class Tiles {
  private route = inject(ActivatedRoute);
  private tileService = inject(TileService);

  protected readonly config$ = this.tileService.config$;
  protected isDebugMode: boolean = false;

  constructor() {
    this.tileService.load();
    this.route.queryParams.subscribe((params) => {
      this.isDebugMode = params['mode'] === 'editor';
    });
  }

  limitTiles(tiles: Tile[], count?: number | null): Tile[] {
    if (count === undefined || count === null || count === 0) {
      return tiles;
    }
    return tiles.slice(0, count);
  }
}
