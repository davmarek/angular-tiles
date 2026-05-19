import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TilesGrid } from '../../components/tiles-grid/tiles-grid';

@Component({
  selector: 'app-home-page',
  imports: [TilesGrid],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
