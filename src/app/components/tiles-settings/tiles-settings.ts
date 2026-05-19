import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { TilesConfig, TileService } from '../../services/tile-service';
import { IconAdminQuares } from '../icons/admin-quares';
import { Toggle } from '../toggle/toggle';

type TileForm = FormGroup<{
  text: FormControl<string>;
  link: FormControl<string>;
  bgColor: FormControl<string>;
  bgImage: FormControl<string>;
}>;

const GRID_SCHEMAS = new Map([
  ['3', [1]],
  ['4', [1, 1, 2, 2, 1, 1]],
]);

@Component({
  selector: 'app-tiles-settings',
  imports: [ReactiveFormsModule, IconAdminQuares, Toggle],
  templateUrl: './tiles-settings.html',
  styleUrl: './tiles-settings.scss',
})
export class TilesSettings {
  private fb = inject(NonNullableFormBuilder);
  private tileService = inject(TileService);

  form = this.fb.group({
    title: ['', Validators.required],
    subtitle: ['', Validators.required],
    gridSchema: ['', Validators.required], // Needs to be string - because HTML select
    visibleTilesCount: [0],
    tiles: this.fb.array<TileForm>([]),
  });

  readonly loadAll = model<boolean>(true);

  @ViewChild('tilesSettingsDialog') dialog!: ElementRef<HTMLDialogElement>;

  get tiles() {
    return this.form.get('tiles') as FormArray;
  }

  private makeTile(): TileForm {
    return this.fb.group({
      text: ['', Validators.required],
      link: ['', Validators.required],
      bgColor: ['#000000', Validators.required],
      bgImage: [''],
    });
  }

  public addTile() {
    this.tiles.push(this.makeTile());
  }

  // Triggered when toggling the dialog (open/closed)
  public onToggle(e: ToggleEvent) {
    if (e.newState !== 'open') {
      return;
    }
    this.tileService.config$.pipe(take(1)).subscribe((c) => c && this.seed(c));
  }

  // Called when dialog is opened
  private seed(config: TilesConfig) {
    // Reset the normal FormControls
    this.form.reset({
      title: config.title,
      subtitle: config.subtitle,
      gridSchema: config.gridSchema.columns.toString(),
      visibleTilesCount: config.visibleTileCount ?? 0,
    });

    // Push all defined tiles to FormArray
    if (this.tiles.length !== config.tiles.length) {
      this.tiles.clear();
      config.tiles.forEach(() => {
        this.tiles.push(this.makeTile());
      });
    }

    // Set the actual data to the array items
    this.tiles.patchValue(config.tiles);

    // If the value of visibleTilesCount is anything other than 0
    // we don't want to load all tiles
    this.loadAll.set(!(config?.visibleTileCount !== 0));
  }

  protected onSave() {
    if (!this.form.valid) {
      return;
    }

    const v = this.form.getRawValue();
    const spans = GRID_SCHEMAS.get(v.gridSchema.toString());

    this.tileService.updateConfig({
      title: v.title,
      subtitle: v.subtitle,
      visibleTileCount: this.loadAll() ? 0 : v.visibleTilesCount,
      gridSchema: {
        columns: parseInt(v.gridSchema),
        spans: spans ?? [1],
      },
      tiles: v.tiles,
    });
    this.form.markAsPristine();

    this.dialog.nativeElement.close();
  }

  protected markFormDirty() {
    this.form.markAsDirty();
  }
}
