import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ViewTeamComponent } from './view-team/view-team.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { BulkUploadDialogComponent } from './bulk-upload-dialog/bulk-upload-dialog.component';
import { AuthGuard } from './auth.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './viewuser/viewuser.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TeamMember1DetailsComponent } from './team-member1-details/team-member1-details.component';
import { TeamMemberComponent } from './team-member/team-member.component';





const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'view-team', component: ViewTeamComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'view-user', component: ViewUserComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'team-member-dashboard', component: TeamMemberComponent, canActivate: [AuthGuard] },
  { path: 'team-member1-details/:id', component: TeamMember1DetailsComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    SidenavComponent,
    BarChartComponent,
    ViewTeamComponent,
    ToolbarComponent,
    BulkUploadDialogComponent,
    CreateUserComponent,
    ViewUserComponent,
    AttendanceComponent,
    TeamMember1DetailsComponent,
    TeamMemberComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    NgChartsModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule
    // MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
