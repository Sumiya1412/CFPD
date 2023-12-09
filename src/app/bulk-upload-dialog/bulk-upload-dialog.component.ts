import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-upload-dialog',
  templateUrl: './bulk-upload-dialog.component.html',
  styleUrls: ['./bulk-upload-dialog.component.css'],
})
export class BulkUploadDialogComponent {
  constructor(public dialog: MatDialog) { }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    // Handle file input as needed
    console.log('Selected file:', file);
  }

  uploadBulkData(): void {
    // Implement bulk upload logic using the selected file
    console.log('Bulk data uploaded!');
    this.closeDialog();
  }

  closeDialog(): void {
    // Close the dialog
    this.dialog.closeAll();
  }
}
