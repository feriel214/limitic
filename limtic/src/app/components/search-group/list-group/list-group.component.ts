import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupeServiceService } from 'src/app/services/groupe-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {

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

   


  deleteGroupe(id:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.groupeService.deleteGroupe(id).subscribe((res:any)=>{
          Swal.fire({
            title: "Deleted!",
            text: "Groupe has been deleted.",
            icon: "success"
          });
          this.ngOnInit();
        })
      
      }
    });
  }

  editGroupe(id:any){
    this.router.navigate([`/dashboard/edit/groupe/${id}`]);
  }

}
