import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Filter by', () => {
    it('should emit on click filter by title', () => {
      spyOn(component.titleValue, 'emit');
      component.filterTitle(0);
      expect(component.titleValue.emit).toHaveBeenCalled();
      expect(component.titleValue.emit).toHaveBeenCalledWith(0);
    });

    it('should emit on click filter by user', () => {
      spyOn(component.userIndexValue, 'emit');
      component.filterUser(0);
      expect(component.userIndexValue.emit).toHaveBeenCalled();
      expect(component.userIndexValue.emit).toHaveBeenCalledWith(0);
    });

    it('should emit on click filter by gender', () => {
      spyOn(component.genderValue, 'emit');
      component.filterUserByGender('M');
      expect(component.genderValue.emit).toHaveBeenCalled();
      expect(component.genderValue.emit).toHaveBeenCalledWith('M');
    });

    it('should emit on click show all users', () => {
      spyOn(component.showAllEvent, 'emit');
      component.showAllUsers();
      expect(component.showAllEvent.emit).toHaveBeenCalled();
    });
  });
});
