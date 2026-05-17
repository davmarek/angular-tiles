import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TilesConfig, TileService } from '../../services/tile-service';
import { TilesSettings } from '../tiles-settings/tiles-settings';

@Component({
  selector: 'app-tiles',
  imports: [AsyncPipe, TilesSettings],
  templateUrl: './tiles.html',
  styleUrl: './tiles.scss',
})
export class Tiles {
  protected readonly config$?: Observable<TilesConfig | null>;
  protected isDebugMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tileService: TileService,
  ) {
    this.config$ = this.tileService.config$.pipe(
      tap((c) =>
        console.log(
          'GRID emit:',
          c?.title,
          c?.tiles?.map((t) => t.text),
        ),
      ),
    );

    this.tileService.load();
    this.route.queryParams.subscribe((params) => {
      this.isDebugMode = params['mode'] === 'editor';
    });
  }
}
