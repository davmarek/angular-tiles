import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tile {
  text: string;
  link: string;
  bgColor: string;
}
export interface GridSchema {
  columns: number;
  spans: number[];
}
export interface TilesConfig {
  gridSchema: GridSchema;
  title: string;
  subtitle: string;
  tiles: Tile[];
}

@Injectable({
  providedIn: 'root',
})
export class TileService {
  private CONFIG_PATH = '/assets/tiles.json' as const;
  private _configSubject = new BehaviorSubject<TilesConfig | null>(null);
  readonly config$ = this._configSubject.asObservable();

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<TilesConfig>(this.CONFIG_PATH).subscribe((cfg) => this._configSubject.next(cfg));
  }

  updateConfig(patch: Partial<TilesConfig>) {
    const current = this._configSubject.value;
    if (!current) {
      return;
    }
    this._configSubject.next({ ...current, ...patch });
  }
}
