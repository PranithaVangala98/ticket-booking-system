import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrains } from './add-trains';

describe('AddTrains', () => {
  let component: AddTrains;
  let fixture: ComponentFixture<AddTrains>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrains]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrains);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
