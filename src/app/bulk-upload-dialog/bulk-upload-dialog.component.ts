import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-upload-dialog',
  templateUrl: './bulk-upload-dialog.component.html',
  styleUrls: ['./bulk-upload-dialog.component.css'],
})
export class BulkUploadDialogComponent {
  selectedFile: File | null = null;
  errorMessage='';
  constructor(public dialogRef: MatDialogRef<BulkUploadDialogComponent>,private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data:any) { }

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.errorMessage='';
      const allowedExtensions = ['.xlsx', '.xls'];
      const extension = file.name.substring(file.name.lastIndexOf('.'));

      if (allowedExtensions.includes(extension.toLowerCase())) {
        this.selectedFile = file;
      } else {
        alert('Invalid file type. Please select a valid Excel file.');
        this.selectedFile = null;
      }
    }
  }

  uploadBulkData() {
    if (!this.selectedFile) {
      this.errorMessage='Please select a file';
      console.error('Please select a file');
      return;
    }
    const uploadUrl =this.data?.isAttendance?'https://localhost:7078/api/Attendance/upload': 'https://localhost:7078/api/Excel1/upload';
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post<string>(uploadUrl, formData)
      .subscribe(response => {
        console.log('File uploaded successfully:', response);
        this.closeDialog(response);
        // Handle success
      }, error => {
        console.error('File upload failed:', error);
        // Handle error
        this.errorMessage=error.error;
      });
  }

  closeDialog(excelData?:any): void {
    // Close the dialog
    this.dialogRef.close({data:excelData});
  }
}
