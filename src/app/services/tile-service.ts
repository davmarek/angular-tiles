import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface TileDefinition {
  text: string;
  link: string;
  bgColor: string;
}
export interface GridSchema {
  columns: number;
  spans: number[];
}
export interface TilesResponse {
  gridSchema: GridSchema;
  title: string;
  subtitle: string;
  tiles: TileDefinition[];
}

@Injectable({
  providedIn: 'root',
})
export class TileService {
  constructor(private http: HttpClient) {}
  getTilesConfig$() {
    return this.http.get<TilesResponse>('/assets/tiles.json');
  }
}
