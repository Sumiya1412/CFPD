import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ViewTeamComponent } from './view-team.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as XLSX from 'xlsx';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

fdescribe('ViewTeamComponent', () => {
  let component: ViewTeamComponent;
  let fixture: ComponentFixture<ViewTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTeamComponent],
      imports: [
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamComponent);
    component = fixture.componentInstance;
    const matPaginator = jasmine.createSpyObj('MatPaginator', ['length', 'pageSize', 'pageIndex', 'pageCount', 'previousPage', 'nextPage']);

    component.paginator = matPaginator;
    component.dataSource = new MatTableDataSource<any>([]);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open bulk upload popup', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.openBulkUploadPopup();
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should close bulk upload popup', () => {
    // Assuming closeBulkUploadPopup() does not have any specific logic to test
    component.closeBulkUploadPopup();
    // You can add more expectations if necessary
    expect(component.showBulkUploadPopup).toBeFalsy();
  });

  // Add more tests as needed for other component methods and functionalities

  // Example: testing exportToExcel method
  // it('should export to Excel', () => {
  //   // Assuming `teams` data is available
  //   spyOn(XLSX, 'writeFile');
  //   component.exportToExcel();
  //   expect(XLSX.writeFile).toHaveBeenCalled();
  // });

  // Example: testing handleFileInput method
  it('should handle file input', () => {
    const file = new File([''], 'test-file.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const event = { target: { files: [file] } };

    // Assuming `handleFileInput` method logs the selected file
    spyOn(console, 'log');

    component.handleFileInput(event);

    expect(console.log).toHaveBeenCalledWith('Selected file:', file);
  });

  it('should load data on initialization', fakeAsync(() => {
    const mockData = [
      { id: 1, projectName: 'Project A', teamMemberName: 'John', assignationStartDate: '2022-01-01', assignationEndDate: '2022-02-01' },
      // Add more mock data as needed
    ];
    spyOn(component['httpClient'], 'get').and.returnValue(of(mockData));

    component.ngOnInit();
    tick();

    expect(component.teams).toEqual(mockData);
    expect(component.dataSource.data).toEqual(mockData);
  }));

  it('should render the table with the correct columns', () => {
    const table = fixture.debugElement.query(By.css('table')).nativeElement;
    const headerCells: any[] = table.querySelectorAll('th');

    expect(headerCells.length).toBe(4); // Adjust the count based on your displayedColumns

    const headerCellText = Array.from(headerCells).map((cell: HTMLElement) => cell?.textContent?.trim());
    expect(headerCellText).toEqual(['Project Code filter_list', 'Team Member Name', 'Assignation Start Date', 'Assignation End Date']);
  });

  it('should upload bulk data', () => {
    spyOn(component, 'closeBulkUploadPopup');
    component.uploadBulkData();
    expect(component.closeBulkUploadPopup).toHaveBeenCalled();
  })
});
