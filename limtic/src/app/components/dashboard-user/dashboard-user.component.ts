import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';



@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit{
  isAuthenticated:any;
  constructor(private authService:AuthServiceService){}
  ngOnInit(): void {
    this.isAuthenticated=this.authService.isAuthenticated();
  }

  LogOut(){
  this.authService.logout();
   }
}
