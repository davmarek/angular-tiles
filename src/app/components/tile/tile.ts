import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tile',
  imports: [],
  templateUrl: './tile.html',
  styleUrl: './tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.gridColumn]': '`span ${span()}`',
  },
})
export class Tile {
  text = input.required<string>();
  link = input.required<string>();
  bgColor = input.required<string>();
  bgImage = input<string>();
  span = input<number>(1);
}
