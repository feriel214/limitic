import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PubServiceService } from 'src/app/services/pub-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pub-user',
  templateUrl: './pub-user.component.html',
  styleUrls: ['./pub-user.component.scss']
})
export class PubUserComponent implements OnInit {

  pubList:any;
  images=['https://picsum.photos/501/500','https://picsum.photos/500/501','https://picsum.photos/501/501','https://picsum.photos/1000/1000']
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



}
