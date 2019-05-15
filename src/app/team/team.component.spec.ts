import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComponent } from './team.component';
import { HttpClientModule } from '@angular/common/http';

// -- Services
import { DataService } from '../data.service';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamComponent ],
      imports: [ HttpClientModule ],
      providers:[DataService],
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
});
