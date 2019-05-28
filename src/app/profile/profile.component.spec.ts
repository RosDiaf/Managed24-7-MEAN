import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProfileComponent } from './profile.component';

// -- Services
import { DataService } from '../data.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ProfileComponent', () => {
    const TitleKey = 'title';
    const NameKey = 'name';
    const GenderKey = 'gender';
    const RoleKey = 'role';
    const IndustryKey = 'industry';

    it('should submit the form when data is validated', () => {
      component.userForm.controls[TitleKey].setValue('Mr');
      component.userForm.controls[NameKey].setValue('Rosario');
      component.userForm.controls[GenderKey].setValue('M');
      component.userForm.controls[RoleKey].setValue('Project Manager');
      component.userForm.controls[IndustryKey].setValue('Telecoms');
      component.onSubmit();
      expect(component.isSubmitted).toEqual(true);
    });

    it('should not submit the form when data is validated', () => {
      component.userForm.controls[TitleKey].setValue('');
      component.userForm.controls[NameKey].setValue('');
      component.userForm.controls[GenderKey].setValue('');
      component.userForm.controls[RoleKey].setValue('');
      component.userForm.controls[IndustryKey].setValue('');
      component.onSubmit();
      expect(component.isSubmitted).toEqual(false);
    });
  });
});
