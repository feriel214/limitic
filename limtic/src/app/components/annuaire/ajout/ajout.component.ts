import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnuaireService } from 'src/app/annuaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent implements OnInit{
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
  

  }

  addAnnuaire(){
    this.annuaireService.addAnnuaire(this.annuaireData)
    .subscribe((res:any)=>{
      Swal.fire(
        'Ajouté !',
        'Annuaire a été Ajouté.',
        'success'
      )
         this.router.navigate(['/dashboard/list/annuaire'])
    })
  }

}
