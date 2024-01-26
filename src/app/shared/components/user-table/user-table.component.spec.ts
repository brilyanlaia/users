import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableComponent } from './user-table.component';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct value when handleRowClick is called', () => {
    const rowValue = 123;
    let emittedValue: number | undefined;

    component.onRowClick.subscribe((value) => {
      emittedValue = value;
    });

    component.handleRowClick(rowValue);

    expect(emittedValue).toBe(rowValue);
  });
});
