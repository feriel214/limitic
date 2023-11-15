import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit{
  isAuthenticated:any;
  constructor(private authService:AuthServiceService){}
  ngOnInit(): void {
    this.isAuthenticated=this.authService.isAuthenticated();
  }

  LogOut(){
  this.authService.logout();
   }

}
