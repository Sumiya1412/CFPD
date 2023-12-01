import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleMenu = new EventEmitter();

  public routeLinks = [
    { link: "dashboard", name: "Dashboard", icon: "dashboard" },
    { link: "team", name: "Manage Team", icon: "supervised_user_circle" },
    { link: "user", name: "Manage User", icon: "account_circle" },
    { link: "attendance", name: "Attendance", icon: "av_timer" },
    // { link: "reset-password", name: "Reset Password", icon: "lock_open" },
  ];


}
