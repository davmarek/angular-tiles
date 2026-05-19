import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TileItem, TileService } from '../../services/tile-service';
import { Tile } from '../tile/tile';
import { TilesSettings } from '../tiles-settings/tiles-settings';

@Component({
  selector: 'app-tiles-grid',
  imports: [AsyncPipe, TilesSettings, Tile],
  templateUrl: './tiles-grid.html',
  styleUrl: './tiles-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TilesGrid {
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

  limitTiles(tiles: TileItem[], count?: number | null): TileItem[] {
    if (count === undefined || count === null || count === 0) {
      return tiles;
    }
    return tiles.slice(0, count);
  }
}
