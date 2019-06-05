import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog.component';
import { ProfileComponent } from '../profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent, ProfileComponent ],
      imports: [ ReactiveFormsModule, FormsModule, HttpClientModule ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event to parent to close dialog', () => {
    spyOn(component.dialogStatus, 'emit');
    component.closeDialog();
    expect(component.dialogStatus.emit).toHaveBeenCalled();
  });
});
