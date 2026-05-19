import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
} from '@angular/core';

export interface SelectOption {
  label: string;
  value: any;
  icon?: string;
}

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select {
  private elementRef = inject(ElementRef);

  options = input<SelectOption[]>([]);
  value = model<string>('');

  isOpen = false;

  get selectedOption() {
    const opts = this.options();
    const val = this.value();
    return opts.find((opt) => opt.value === val) || opts[0] || null;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SelectOption, event: Event) {
    event.stopPropagation();
    this.isOpen = false;
    this.value.set(option.value);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
