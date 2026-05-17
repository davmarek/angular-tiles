import { Component } from '@angular/core';

@Component({
  selector: 'icon-admin-quares',
  template: `
    <div class="iaq">
      <span class="iaq-1"></span>
      <span class="iaq-2"></span>
      <span class="iaq-3"></span>
      <span class="iaq-4"></span>
    </div>
  `,
  styles: `
    .iaq {
      width: 16px;
      height: 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px;
    }
    .iaq * {
      width: 7px;
      height: 7px;
      border-radius: 2px;
      opacity: 0.5;
      background-color: #407cff;
    }
    .iaq span:first-child {
      opacity: 1;
    }
  `,
})
export class IconAdminQuares {}
