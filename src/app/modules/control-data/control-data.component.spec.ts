import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDataComponent } from './control-data.component';

describe('ControlDataComponent', () => {
  let component: ControlDataComponent;
  let fixture: ComponentFixture<ControlDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlDataComponent]
    });
    fixture = TestBed.createComponent(ControlDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
