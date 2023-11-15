import { Component, OnInit } from '@angular/core';
import { AnnuaireService } from 'src/app/annuaire.service';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {

  annauiresList:any;

  constructor(private Annuaire:AnnuaireService){}
  ngOnInit(): void {
    this.getAllAnnuaires();
   }
  getAllAnnuaires(){
    this.Annuaire.getAllAnnuaires().subscribe((res:any)=>{
      this.annauiresList=res.annuaires;  
      console.log("annauiresList",this.annauiresList)
     })
  }

  



}
