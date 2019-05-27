import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ReactiveFormsModule, FormsModule],
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

  it('should submit the form when data is validated', () => {
    const title_key = 'title';
    const name_key = 'name';
    const gender_key = 'gender';
    const role_key = 'role';
    const industry_key = 'industry';

    component.userForm.controls[title_key].setValue('Mr');
    component.userForm.controls[name_key].setValue('Rosario');
    component.userForm.controls[gender_key].setValue('M');
    component.userForm.controls[role_key].setValue('Project Manager');
    component.userForm.controls[industry_key].setValue('Telecoms');
    component.onSubmit()
    expect(component.isSubmitted).toEqual(true);
  });

  it('should not submit the form when data is validated', () => {
    const title_key = 'title';
    const name_key = 'name';
    const gender_key = 'gender';
    const role_key = 'role';
    const industry_key = 'industry';

    component.userForm.controls[title_key].setValue('');
    component.userForm.controls[name_key].setValue('');
    component.userForm.controls[gender_key].setValue('');
    component.userForm.controls[role_key].setValue('');
    component.userForm.controls[industry_key].setValue('');
    component.onSubmit()
    expect(component.isSubmitted).toEqual(false);
  });
});
