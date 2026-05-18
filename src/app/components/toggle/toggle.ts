import { Component, model } from '@angular/core';

@Component({
  selector: 'toggle',
  templateUrl: './toggle.html',
  styleUrl: './toggle.scss',
})
export class Toggle {
  readonly checked = model.required<boolean>();
  protected toggle() {
    this.checked.set(!this.checked());
  }
}
