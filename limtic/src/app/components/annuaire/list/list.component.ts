import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnuaireService } from 'src/app/annuaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  annauiresList:any;

  constructor(private Annuaire:AnnuaireService,private router : Router){}
  ngOnInit(): void {
    this.getAllAnnuaires();
   }
  getAllAnnuaires(){
    this.Annuaire.getAllAnnuaires().subscribe((res:any)=>{
      this.annauiresList=res.annuaires;  
      console.log("annauiresList",this.annauiresList)
     })
  }

  deleteAnnuaire(id:any){
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

        this.Annuaire.deleteAnnuaire(id).subscribe((res:any)=>{
          Swal.fire({
            title: "Deleted!",
            text: "Annuaire has been deleted.",
            icon: "success"
          });
          this.ngOnInit();
        })
      
      }
    });
  }

  editAnnuaire(id:any){
    this.router.navigate([`/dashboard/edit/annuaire/${id}`]);
  }


}
