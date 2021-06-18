import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNameComponent } from './dialog-name.component';

describe('DialogNameComponent', () => {
  let component: DialogNameComponent;
  let fixture: ComponentFixture<DialogNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
