import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PubServiceService } from 'src/app/services/pub-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-pub',
  templateUrl: './list-pub.component.html',
  styleUrls: ['./list-pub.component.css']
})
export class ListPubComponent implements OnInit {

  pubList:any;

  constructor(private Pub:PubServiceService,private router : Router){}
  ngOnInit(): void {
    this.getAllPubs();
   }
   
  getAllPubs(){
    this.Pub.getAllPubs().subscribe((res:any)=>{
      this.pubList=res.publications;  
      console.log("pubList",this.pubList)
     })
  }






  editPub(id:any){
    this.router.navigate([`/dashboard/edit/pub/${id}`]);
  
  }
  deletePub(id:any){
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

        this.Pub.deletePub(id).subscribe((res:any)=>{
          Swal.fire({
            title: "Deleted!",
            text: "Pub has been deleted.",
            icon: "success"
          });
          this.ngOnInit();
        })
      
      }
    });
  }
}
