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
    { link: "team", name: "Manage Team", icon: "account_balance" },
    { link: "user", name: "Manage User", icon: "dashboard" },
    { link: "attendance", name: "Attendance", icon: "account_balance" },
  ];


}
