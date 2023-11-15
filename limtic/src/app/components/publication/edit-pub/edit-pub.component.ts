import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnuaireService } from 'src/app/annuaire.service';
import { PubServiceService } from 'src/app/services/pub-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pub',
  templateUrl: './edit-pub.component.html',
  styleUrls: ['./edit-pub.component.css']
})
export class EditPubComponent implements OnInit{
  id:any;
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
    this.getAllAnnuaires()
    this.id = this.actRoute.snapshot.paramMap.get('id');
  
    this.PubService.getPubById(this.id)
    .subscribe((res:any)=>{
      console.log("pub edit ",res)
      this.PubData=res.publication;
      this.PubData.idAnnuaire=res.publication.idAnnuaire._id;
    
    })

  }


 
  getAllAnnuaires(){
    this.Annuaire.getAllAnnuaires().subscribe((res:any)=>{
      this.annauiresList=res.annuaires;  
      console.log("annauiresList",this.annauiresList)
     })
  }



  editPub(){
    this.PubService.editPub(this.id,this.PubData)
    .subscribe((res:any)=>{
      Swal.fire(
        'Modifié !',
        'Publication a été modifié.',
        'success'
      )
         this.router.navigate(['/dashboard/list/pub'])
  
    })
  }

  transformDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
