import { TestBed, async, inject, getTestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of, from, Observer } from 'rxjs';

// Mock Data
import { ProjectManagers } from '../assets/mock/users';
import { Team } from '../assets/mock/team';

// Service
import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpTestingController]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it(`should service be available`, async(inject([HttpTestingController, DataService],
    (httpClient: HttpTestingController, dataService: DataService) => {
      dataService.getUsers();
      expect(dataService).toBeTruthy();
  })));

  it(`should service be available when term provided`, async(inject([HttpTestingController, DataService],
    (httpClient: HttpTestingController, dataService: DataService) => {
      dataService.getUsersByTerm('Louis');
      expect(dataService).toBeTruthy();
  })));

  xdescribe('getProducts', () => {
    let service: DataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [DataService]
      });

      const testBed = getTestBed();
      service = testBed.get(DataService);
      httpMock = testBed.get(HttpTestingController);
    });

    it('should return an Observable<Users[]>', () => {
      service.getUsers().subscribe((data) => {
          expect(data.length).toBeGreaterThan(0);
          expect(data).toEqual(ProjectManagers);
      });
    });

    it('should return an Observable<Team[]>', () => {
      service.getEmployee().subscribe((data) => {
        expect(data.length).toBeGreaterThan(0);
        expect(data).toEqual(Team);
      });
    });

    it('should return an Observable<Team[]>', () => {
      const user = {
        title: 'Mr',
        name: 'Rosario',
        surname: 'Diaferia',
        gender: 'M',
        role: 'Project MGR',
        industry: 'Banking'
      };
      service.setUsers(user).subscribe((data) => {
        expect(data).toEqual(user);
      });
    });

    it('should return an Observable<Team[]>', () => {
      const user = {
        title: 'Mr',
        name: 'Rosario',
        surname: 'Diaferia',
        gender: 'M',
        role: 'Project MGR',
        industry: 'Banking'
      };
      service.setUsers(user);
      // expect(data).toEqual(user);
      // service.setUsers(user).subscribe((data) => {
      //   expect(data).toEqual(user);
      // });
    });

    xit(`should service be available`, inject([HttpTestingController, DataService],
      (httpClient: HttpTestingController, dataService: DataService) => {
        // -- Added
        dataService.getEmployee().subscribe((event: HttpEvent<any>) => {
          // expect(event.body).toEqual(ProjectManagers);
        });

        const mockReq = httpClient.expectOne(`http://localhost:3000/api/users`);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(ProjectManagers);
        httpClient.verify();
    }));
  });
});
