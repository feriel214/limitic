import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnuaireService } from 'src/app/annuaire.service';
import { GroupeServiceService } from 'src/app/services/groupe-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit{
  id:any;
  annauiresList:any;
  groupeData ={
    nom:" ",
    responsable: {_id:""},
    description: " ",
    membres:[]
  }

  
  constructor(private router:Router , private actRoute:ActivatedRoute,private groupeService:GroupeServiceService ,private Annuaire:AnnuaireService){

  }
  ngOnInit(): void {
    this.getAllAnnuaires()
    this.id = this.actRoute.snapshot.paramMap.get('id');
  
    this.groupeService.getGroupeById(this.id)
    .subscribe((res:any)=>{
      console.log("pub edit ",res)
      this.groupeData=res.group;
      this.groupeData.responsable=res.group.responsable;
    
    })

  }


 
  getAllAnnuaires(){
    this.Annuaire.getAllAnnuaires().subscribe((res:any)=>{
      this.annauiresList=res.annuaires;  
      console.log("annauiresList",this.annauiresList)
     })
  }



  editGroupe(){
    this.groupeService.editGroupe(this.id,this.groupeData)
    .subscribe((res:any)=>{
      Swal.fire(
        'Modifié !',
        'Groupe a été modifié.',
        'success'
      )
         this.router.navigate(['/dashboard/list/groupe'])
  
    })
  }


}
