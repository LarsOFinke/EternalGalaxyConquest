import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMenuComponent } from './tile-menu.component';

describe('TileMenuComponent', () => {
  let component: TileMenuComponent;
  let fixture: ComponentFixture<TileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
