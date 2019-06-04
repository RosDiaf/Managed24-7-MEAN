import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile.component';
import { Observable, of, from, Observer } from 'rxjs';

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
    const SurnameKey = 'surname';
    const GenderKey = 'gender';
    const RoleKey = 'role';
    const IndustryKey = 'industry';

    it('should submit the form when data is validated', () => {
      component.userForm.controls[TitleKey].setValue('Mr');
      component.userForm.controls[NameKey].setValue('Rosario');
      component.userForm.controls[SurnameKey].setValue('Diaferia');
      component.userForm.controls[GenderKey].setValue('M');
      component.userForm.controls[RoleKey].setValue('Project Manager');
      component.userForm.controls[IndustryKey].setValue('Telecoms');
      component.onSubmit();
      expect(component.isSubmitted).toEqual(true);
    });

    it('should not submit the form when data is validated', () => {
      component.userForm.controls[TitleKey].setValue('');
      component.userForm.controls[NameKey].setValue('');
      component.userForm.controls[SurnameKey].setValue('');
      component.userForm.controls[GenderKey].setValue('');
      component.userForm.controls[RoleKey].setValue('');
      component.userForm.controls[IndustryKey].setValue('');
      component.onSubmit();
      expect(component.isSubmitted).toEqual(false);
    });

    it('should call DataService when component initialized', () => {
      let service = fixture.debugElement.injector.get(DataService);
      spyOn(service, 'setUsers').and.returnValue({message: "Product saved successfully!"});
      fixture.detectChanges();
      expect(component.isSubmitted).toEqual(undefined);
      // const user = {
      //   title: 'Mr',
      //   name: 'Rosario',
      //   surname: 'Diaferia',
      //   gender: 'M',
      //   role: 'Project Manager',
      //   industry: 'Banking'
      // };
      // let service: DataService;
      // service = TestBed.get(DataService);
      // spyOn(service, 'setUsers').and.returnValue(
      //   Observable.create((observer: Observer<{user}>) => {
      //     observer.next({user});
      //     return observer;
      //   })
      // );
      // component.onSubmit();
      // expect(component.isSubmitted).toEqual(false);
    });
  });
});
