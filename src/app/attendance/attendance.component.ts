import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { BulkUploadDialogComponent } from '../bulk-upload-dialog/bulk-upload-dialog.component';
import * as XLSX from 'xlsx';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

export interface Project {
  attendanceId: number;
  employeeName: string;
  employeeCode: string;
  projectCode: string;
  projectName: string;
  date: string;
  workHours: string;
  status: string;
}

export interface SearchResponse {
  projectName: string;
  teamMemberName: string;
  numberOfDays: number;
  totalWorkingHours: number;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  memberId: string = '';
  projectId: string = '';
  StartDateSelected: any;
  EndDateSelected: any;
  maxDate?: string;

  projectOptions: string[] = [];
  memberOptions: string[] = [];

  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize: number = 5;

  displayedColumns: string[] = ['projectName', 'teamMemberName', 'noOfDaysOfAttendance', 'noOfHours'];
  dataSource: MatTableDataSource<any>; // Use 'any' type for flexibility
  teams: Project[];
  completeTeams: Project[] = [];
  searchOut: SearchResponse[];

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.dataSource = new MatTableDataSource<any>([]); // Initialize with empty data
    this.teams = [];
    this.completeTeams = [];
    this.searchOut = [];
  }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.httpClient.get<Project[]>('https://localhost:7078/api/Attendance/view-all-records').subscribe({
      next: (value: Project[]) => {
        this.completeTeams = value;

        // Fetch unique projects and members without slicing
        const uniqueProjects = [...new Set(value.map(team => team.projectName))];
        const uniqueMembers = [...new Set(value.map(team => team.employeeName))];

        // Set options for dropdowns
        this.projectOptions = uniqueProjects;
        this.memberOptions = uniqueMembers;

        // Set initial teams array based on pageSize
        this.teams = this.completeTeams.slice(0, this.pageSize);
        this.dataSource.data = this.teams;

        // Set total items for paginator
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.length = this.completeTeams.length;
      }
    });
  }

  search(): void {
    const searchParams = {
      projectName: this.projectId,
      teamMemberName: this.memberId,
      startDate: this.StartDateSelected,
      endDate: this.EndDateSelected
    };

    this.httpClient.get<SearchResponse[] | SearchResponse>('https://localhost:7078/api/Attendance/Attendance', { params: searchParams }).subscribe({
      next: (value: SearchResponse[] | SearchResponse) => {
        // Check if searchOut is an object and assign it directly
        if (Array.isArray(value)) {
          this.dataSource.data = value.map(result => ({
            projectName: result.projectName,
            teamMemberName: result.teamMemberName,
            noOfDaysOfAttendance: result.numberOfDays,
            noOfHours: result.totalWorkingHours
          }));
        } else {
          // If it's not an array, it's a single object
          this.dataSource.data = [value].map(result => ({
            projectName: result.projectName,
            teamMemberName: result.teamMemberName,
            noOfDaysOfAttendance: result.numberOfDays,
            noOfHours: result.totalWorkingHours
          }));
        }

        console.log('API Response:', value);
        console.log('DataSource Data:', this.dataSource.data);
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.teams = this.completeTeams.slice(startIndex, endIndex);
    this.dataSource.data = this.teams;
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.httpClient.post('https://localhost:7078/api/Attendance/upload', formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
        this.closeBulkUploadPopup();
        console.log('Popup closed after successful upload');
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        // Handle the error, show a message, etc.
      }
    });
  }

  openBulkUploadPopup(): void {
    const dialogRef = this.dialog.open(BulkUploadDialogComponent, { data: { isAttendance: true } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const file = result.data[0]; // Assuming the first element in data is the file
        this.uploadFile(file);
      }
    });
  }

  closeBulkUploadPopup(): void {
    this.dialog.closeAll();
  }

  uploadBulkData(): void {
    // Implement bulk upload logic using the selected file
    console.log('Bulk data uploaded!');
    this.closeBulkUploadPopup();
  }


  exportToExcel(): void {
    this.authService.exportToExcel().subscribe((response) => {
      const fileName = response.headers.get('file-name')?.split(';')[1]?.split('=')[1];
      const blob: Blob = response.body as Blob;
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName || '';
      a.click();
    });
  }

  downloadExcel(): void {
    const fileName = 'attendance_results.xlsx';

    // Create worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);

    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save to file
    XLSX.writeFile(wb, fileName);
  }
}
