import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewTeamComponent } from './view-team.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as XLSX from 'xlsx';
import { MatIconModule } from '@angular/material/icon';

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
        BrowserAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamComponent);
    component = fixture.componentInstance;
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
});
