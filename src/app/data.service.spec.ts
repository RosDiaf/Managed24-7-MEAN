import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

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
      expect(dataService).toBeTruthy();
  })));

  it(`should service be available when term provided`, async(inject([HttpTestingController, DataService],
    (httpClient: HttpTestingController, dataService: DataService) => {
      dataService.getUsersByTerm('Louis');
      expect(dataService).toBeTruthy();
  })));
});
