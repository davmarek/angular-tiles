import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private http: HttpClient) {}
  getTilesConfig$() {
    return this.http.get<TilesConfig>('/assets/tiles.json');
  }
}
