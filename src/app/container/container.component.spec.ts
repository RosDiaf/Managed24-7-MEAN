import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { ContainerComponent } from './container.component';
import { FilterComponent } from '../filter/filter.component';
import { HeaderComponent } from '../header/header.component';
import { SearchComponent } from '../search/search.component';
import { TableComponent } from '../table/table.component';
import { ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, from, Observer } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProjectManagers } from '../../assets/mock/users'
// -- Services
import { DataService } from '../data.service';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        AppComponent,
        FilterComponent,
        HeaderComponent,
        SearchComponent,
        TableComponent
      ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Search Term Form');
  });

  describe('Subscribe to service', () => {
    let service: DataService;
    let response;
    beforeEach(() => {
      response = [
        { title: 'Mr', name: 'Louis', surnmae: 'Farrell', gender: 'M', role: 'Project Manager', industry: 'Banking' },
        { title: 'Ms', name: 'Lida', surnmae: 'Harriston', gender: 'F', role: 'Project Manager', industry: 'Public Sector' },
        { title: 'Ms', name: 'Shirely', surnmae: 'Challis', gender: 'F', role: 'Project Manager', industry: 'Aereospace' },
        { title: 'Mrs', name: 'Alisa', surnmae: 'Merryman', gender: 'M', role: 'Project Manager', industry: 'Media' },
      ];
    });

    it('should call DataService when component initialized', fakeAsync(() => {
      service = TestBed.get(DataService);
      spyOn(service, 'getUsers').and.returnValue(
        Observable.create((observer: Observer<{
          title: string,
          name: string,
          surname: string,
          gender: string,
          role: string,
          industry: string }>) => {
          observer.next(response);
          return observer;
        })
      );
      component.ngOnInit();
      expect(component.users).toBeDefined();
    }));

    it('should display a system error when DataService fails', fakeAsync(() => {
      service = TestBed.get(DataService);
      spyOn(service, 'getUsers').and.returnValue(
        Observable.create((observer: Observer<{
          title: string,
          name: string,
          surname: string,
          gender: string,
          role: string,
          industry: string }>) => {
          return observer.error('something went wrong');
        })
      );
      component.ngOnInit();
      expect(component.users).not.toBeDefined();
      expect(component.isServiceFail).toBe(true);
    }));

    it('should call DataService when term is provided', fakeAsync(() => {
      service = TestBed.get(DataService);
      spyOn(service, 'getUsersByTerm').and.returnValue(
        Observable.create((observer: Observer<{
          title: string,
          name: string,
          surname: string,
          gender: string,
          role: string,
          industry: string }>) => {
          observer.next(response);
          return observer;
        })
      );
      component.getUsersByTerm('Ali');
      expect(component.users).toBeDefined();
    }));

    it('should display a system error when service to get user by term failed', fakeAsync(() => {
      service = TestBed.get(DataService);
      spyOn(service, 'getUsersByTerm').and.returnValue(
        Observable.create((observer: Observer<{
          title: string,
          name: string,
          surname: string,
          gender: string,
          role: string,
          industry: string }>) => {
          return observer.error('something went wrong');
        })
      );
      component.getUsersByTerm('Ali');
      expect(component.users).not.toBeDefined();
      expect(component.isServiceFail).toBe(true);
    }));

    it('should call DataService when user is delete', () => {
      service = TestBed.get(DataService);
      spyOn(service, 'deleteUsers').and.returnValue(
        Observable.create((observer: Observer<{ message: string }>) => {
          observer.next(response);
          return observer;
        })
      );
      component.deleteUser('5c980e5b7e5d3a3434edbe1f');
      expect(component.isSpinner).toEqual(true);
      expect(component.isUserId).toEqual('5c980e5b7e5d3a3434edbe1f');
    });

    it('should return error message when service failed to delete user', () => {
      service = fixture.debugElement.injector.get(DataService);
      spyOn(service, 'deleteUsers').and.returnValue(undefined);
      fixture.detectChanges();
      expect(component.isUserId).not.toBeDefined();
    });
  });

  describe('Filter user', () => {
    let response;
    beforeEach(() => {
      response = [
        { title: 'Mr', name: 'Louis Farrell', gender: 'M' },
        { title: 'Ms', name: 'Lida Harriston', gender: 'F' },
        { title: 'Mrs', name: 'Shirely Challis', gender: 'F' },
        { title: 'Mrs', name: 'Alisa Merryman', gender: 'F' }
      ];
    });

    it('should filter the list for given user title', () => {
      component.users = response;
      component.filterUserByTitle('Mr');
      expect(component.filterList.length).toBeGreaterThan(0);
      expect(component.showAll).toBe(true);
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
