import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HometextComponent } from './hometext.component';

describe('HometextComponent', () => {
  let component: HometextComponent;
  let fixture: ComponentFixture<HometextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
