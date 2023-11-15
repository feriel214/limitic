import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnuaireService } from 'src/app/annuaire.service';
import { PubServiceService } from 'src/app/services/pub-service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pub',
  templateUrl: './add-pub.component.html',
  styleUrls: ['./add-pub.component.css']
})
export class AddPubComponent implements OnInit{
  annauiresList:any;
  PubData ={
    idAnnuaire:" ",
    titre: " ",
    publicdate: " ",
    abstract: " "
  }
  
  
  constructor(private router:Router , private actRoute:ActivatedRoute,private PubService:PubServiceService ,private Annuaire:AnnuaireService){

  }
  ngOnInit(): void {
  this.getAllAnnuaires();

  }

  addPublication(){
    console.log("*********Pubdata",this.PubData);
    this.PubService.addPub(this.PubData)
    .subscribe((res:any)=>{
      Swal.fire(
        'Ajouté !',
        'Pub a été Ajouté.',
        'success'
      )
         this.router.navigate(['/dashboard/list/pub'])
    })
  }

 

 
  getAllAnnuaires(){
    this.Annuaire.getAllAnnuaires().subscribe((res:any)=>{
      this.annauiresList=res.annuaires;  
      console.log("annauiresList",this.annauiresList)
     })
  }


}
