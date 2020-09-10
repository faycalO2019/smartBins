import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoubsvgComponent } from './poubsvg.component';

describe('PoubsvgComponent', () => {
  let component: PoubsvgComponent;
  let fixture: ComponentFixture<PoubsvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoubsvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoubsvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
