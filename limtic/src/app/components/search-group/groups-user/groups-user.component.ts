import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupeServiceService } from 'src/app/services/groupe-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups-user',
  templateUrl: './groups-user.component.html',
  styleUrls: ['./groups-user.component.css']
})
export class GroupsUserComponent  implements OnInit {

  groupsList:any;

  constructor(private groupeService:GroupeServiceService,private router : Router){}
  ngOnInit(): void {
    this.getAllGroupes()
   }
   getAllGroupes(){
    this.groupeService.getAllGroupes().subscribe((res:any)=>{
      this.groupsList=res.groups;  
      console.log("annauiresList",this.groupsList)
     })
  }

   




}
