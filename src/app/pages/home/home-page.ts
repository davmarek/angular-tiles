import { Component } from '@angular/core';
import { Tiles } from '../../components/tiles/tiles';

@Component({
  selector: 'app-home-page',
  imports: [Tiles],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
