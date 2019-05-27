import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { TeamComponent } from './team.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, from, Observer } from 'rxjs';

import { Team } from '../../assets/mock/team';

// -- Services
import { DataService } from '../data.service';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamComponent ],
      imports: [ HttpClientModule ],
      providers: [ DataService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Subscribe to service', () => {
    let service: DataService;
    let response;

    beforeEach(() => {
      response = Team;
    });

    it('should call DataService when component initialized', fakeAsync(() => {
      service = TestBed.get(DataService);
      spyOn(service, 'getEmployee').and.returnValue(
        Observable.create((observer: Observer<{Team}>) => {
          observer.next(response);
          return observer;
        })
      );
      component.ngOnInit();
      expect(component.employee).toBeDefined();
    }));

    it('should display a system error', fakeAsync(() => {
      service = TestBed.get(DataService);
      spyOn(service, 'getEmployee').and.returnValue(
        Observable.create((observer: Observer<{Team}>) => {
          return observer.error('something went wrong');
        })
      );
      component.ngOnInit();
      expect(component.employee).not.toBeDefined();
      expect(component.isServiceFail).toBe(true);
    }));
  });

  describe('Subscribe to service', () => {
    it('should add team member to model when connect button is clicked', () => {
      component.connect('5cd89833bfb4329482e7d290', 0);
      expect(component.teamMemberID.length).toBeDefined();
    });
  });

});
