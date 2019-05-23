import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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

    let injector: TestBed;
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
