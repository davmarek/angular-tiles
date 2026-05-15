import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesSettings } from './tiles-settings';

describe('TilesSettings', () => {
  let component: TilesSettings;
  let fixture: ComponentFixture<TilesSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilesSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
