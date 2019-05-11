import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, from, Observer } from 'rxjs';

// -- Services
import { DataService } from './data.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FilterComponent,
        HeaderComponent,
        SearchComponent,
        TableComponent
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

  describe('Subscribe to service', () => {
    let service: DataService;
    let response;
    beforeEach(() => {
      response =  [
        { name: "Louis Farrell", gender: "M" },
        { name: "Lida Harriston", gender: "F" },
        { name: "Shirely Challis", gender: "F" },
        { name: "Alisa Merryman", gender: "F" }
      ];
    });

    it('should call DataService when component initialized', fakeAsync(() => {
      service = TestBed.get(DataService);
      spyOn(service, 'getUsers').and.returnValue(
        Observable.create((observer: Observer<{ name: string, gender: string }>) => {
          observer.next(response);
          return observer;
        })
      );
      component.ngOnInit();
      expect(component.users).toBeDefined();
    }));

    it('should call DataService when term is provided', fakeAsync(() => {
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
  
  describe('Filter user', () => {
    let response;
    beforeEach(() => {
      response =  [
        { name: "Louis Farrell", gender: "M" },
        { name: "Lida Harriston", gender: "F" },
        { name: "Shirely Challis", gender: "F" },
        { name: "Alisa Merryman", gender: "F" }
      ];
    });

    it('should filter the list for given user name', () => {
      component.users = response;
      component.filterUser(1);
      expect(component.filterList.length).toBeGreaterThan(0);
      expect(component.showAll).toBe(true);
    });

    it('should filter the list for given gender', () => {
      component.users = response;
      component.filterUserByGender('M');
      expect(component.filterList.length).toBeGreaterThan(0);
      expect(component.showAll).toBe(true);
    });

    it('should show the complete list when \'show all\' button is clicked', () => {
      component.users = response;
      component.showAllUsers();
      expect(component.filterList).toEqual(component.users);
    });
  });
});
