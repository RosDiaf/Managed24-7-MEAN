import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from '../dialog/dialog.component';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent, TableComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('should render th tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th')).toBeTruthy();
  });

  describe('Remove user from MongoDb', () => {
    it('should send user id to parent component when delete button is clicked', (done) => {
      component.removeUserFromList.subscribe(foo => {
        expect(foo).toEqual('5c980e5b7e5d3a3434edbe1f');
        done();
      });
      component.removeUser('5c980e5b7e5d3a3434edbe1f');
    });
  });

  describe('Open dialog', () => {
    it('should open dialog when edit button is clicked', () => {
      component.openDialog('5c980e5b7e5d3a3434edbe1f');
      expect(component.isDialogOpen).toEqual(true);
      expect(component.editUserId).toEqual('5c980e5b7e5d3a3434edbe1f');
    });
  });
});
