import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { BulkUploadDialogComponent } from '../bulk-upload-dialog/bulk-upload-dialog.component';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent {
  teams = [
    { name: 'Team A', users: 'User1, User2' },
    { name: 'Team B', users: 'User3, User4' },
    // Add more team data as needed
  ];

  showBulkUploadPopup = false;

  constructor(public dialog: MatDialog) { }

  openBulkUploadPopup(): void {
    const dialogRef = this.dialog.open(BulkUploadDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  closeBulkUploadPopup(): void {
    //this.showBulkUploadPopup = false;
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.teams);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teams');
    XLSX.writeFile(wb, 'teams.xlsx');
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    // Handle file input as needed
    console.log('Selected file:', file);
  }

  uploadBulkData(): void {
    // Implement bulk upload logic using the selected file
    console.log('Bulk data uploaded!');
    this.closeBulkUploadPopup();
  }
}
