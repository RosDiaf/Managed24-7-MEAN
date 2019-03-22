import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';

// -- Services
import { DataService } from './data.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers:[DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h2 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Search Term Form');
  });

  it('should render label name in a label tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#term-label').textContent).toContain('Term');
  });

  it('should render term input tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#term')).toBeTruthy();
  });

  it('should render button label name in a button tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#submit').textContent).toContain('Submit');
  });

  describe('Form term', () => {
    it('should submit the form', () => {
      component.termForm.controls['term'].setValue('Ali');
      let spy = spyOn(component, 'getUsersByTerm');
      component.onSubmit();
      expect(component.isSubmitted).toBe(true);
      expect(spy).toHaveBeenCalledWith('Ali');
    });
  });

  describe('Subscribe to service', () => {
    let service: DataService;
    it('should use DataService', fakeAsync(() => {
      let response =  [
        { name: "Louis Farrell", gender: "M" },
        { name: "Lida Harriston", gender: "F" },
        { name: "Shirely Challis", gender: "F" },
        { name: "Alisa Merryman", gender: "F" }
      ];
      service = TestBed.get(DataService);
      spyOn(service, 'getUsersByTerm').and.returnValue(
        Observable.create((observer: Observer<{ name: string, gender: string }>) => {
          observer.next(response);
          return observer;
        })
      );
      component.getUsersByTerm('Ali');
      expect(component.users).toBeDefined();
    }));

    it('should display a system error', fakeAsync(() => {
      service = TestBed.get(DataService);
      spyOn(service, 'getUsersByTerm').and.returnValue(
        Observable.create((observer: Observer<{ name: string, gender: string }>) => {
          return observer.error('something went wrong');
        })
      );
      component.getUsersByTerm('Ali');
      expect(component.users).not.toBeDefined();
      expect(component.isServiceFail).toBe(true);
    }));
  });
});
