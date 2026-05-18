import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TilesConfig {
  gridSchema: GridSchema;
  title: string;
  subtitle: string;
  visibleTileCount: number | null; // 0 = show all, N = show first N
  tiles: Tile[];
}
export interface GridSchema {
  columns: number;
  spans: number[];
}
export interface Tile {
  text: string;
  link: string;
  bgColor: string;
  bgImage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TileService {
  private CONFIG_PATH = '/assets/tiles.json' as const;

  private http = inject(HttpClient);

  private _configSubject = new BehaviorSubject<TilesConfig | null>(null);
  readonly config$ = this._configSubject.asObservable();

  load() {
    this.http.get<TilesConfig>(this.CONFIG_PATH).subscribe({
      next: (cfg) => {
        this._configSubject.next(cfg);
      },
      error: () =>
        this._configSubject.next({
          gridSchema: { columns: 1, spans: [1] },
          title: '',
          subtitle: '',
          visibleTileCount: 0,
          tiles: [],
        }),
    });
  }

  updateConfig(patch: Partial<TilesConfig>) {
    const current = this._configSubject.value;
    if (!current) {
      return;
    }
    this._configSubject.next({ ...current, ...patch });
  }
}
