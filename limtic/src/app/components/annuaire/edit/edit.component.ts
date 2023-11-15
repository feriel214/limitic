import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnuaireService } from 'src/app/annuaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  id: any;
  annuaireData = {
    firstname: " ",
    lastname: " ",
    fonctionGrade: " ",
    structureDeRecherche: " ",
    bureau: {
      etablissement: " ",
      departement: "",
      address: ""
    },
    tel: " ",
    fax: " ",
    email: " "
  }
  
  constructor(private router:Router , private actRoute:ActivatedRoute,private annuaireService:AnnuaireService ){

  }
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  
    this.annuaireService.getAnnuaireById(this.id)
    .subscribe((res:any)=>{
      console.log("annuaire edit ",res)
      this.annuaireData=res.annuaire;
    
    })

  }


  editAnnuaire(){
    this.annuaireService.editAnnuaire(this.id,this.annuaireData)
    .subscribe((res:any)=>{
      Swal.fire(
        'Modifié !',
        'Annuaire a été modifié.',
        'success'
      )
         this.router.navigate(['/dashboard/list/annuaire'])
  
    })
  }

}
