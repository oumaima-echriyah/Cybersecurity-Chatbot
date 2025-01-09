import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffusionModelInterfaceComponent } from './diffusion-model-interface.component';

describe('DiffusionModelInterfaceComponent', () => {
  let component: DiffusionModelInterfaceComponent;
  let fixture: ComponentFixture<DiffusionModelInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiffusionModelInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiffusionModelInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
