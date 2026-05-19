import { Component, ElementRef, HostListener, inject } from '@angular/core';

@Component({
  selector: 'app-tile-dropdown',
  imports: [],
  templateUrl: './tile-dropdown.html',
  styleUrl: './tile-dropdown.scss',
})
export class TileDropdown {
  private elementRef = inject(ElementRef);
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
