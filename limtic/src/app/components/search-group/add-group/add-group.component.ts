import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnuaireService } from 'src/app/annuaire.service';
import { GroupeServiceService } from 'src/app/services/groupe-service.service';
import { PubServiceService } from 'src/app/services/pub-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit{

  annauiresList:any;
  groupeData ={
    nom:" ",
    responsable: " ",
    description: " ",
    membres:[]
  }

  
  constructor(private router:Router , private actRoute:ActivatedRoute,private groupeService:GroupeServiceService ,private Annuaire:AnnuaireService){

  }
  ngOnInit(): void {
  this.getAllAnnuaires();

  }

  addGroup(){
    console.log("*********groupeData",this.groupeData);
    this.groupeService.addGroupe(this.groupeData)
    .subscribe((res:any)=>{
      Swal.fire(
        'Ajouté !',
        'Groupe a été Ajouté.',
        'success'
      )
         this.router.navigate(['/dashboard/list/groupe'])
    })
  }

 

 
  getAllAnnuaires(){
    this.Annuaire.getAllAnnuaires().subscribe((res:any)=>{
      this.annauiresList=res.annuaires;  
      console.log("annauiresList",this.annauiresList)
     })
  }

}
