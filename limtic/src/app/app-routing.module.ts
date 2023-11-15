import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnuaireComponent } from './components/annuaire/annuaire.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { EditComponent } from './components/annuaire/edit/edit.component';
import { ListComponent } from './components/annuaire/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ListGroupComponent } from './components/search-group/list-group/list-group.component';
import { AjoutComponent } from './components/annuaire/ajout/ajout.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddPubComponent } from './components/publication/add-pub/add-pub.component';
import { EditPubComponent } from './components/publication/edit-pub/edit-pub.component';
import { ListPubComponent } from './components/publication/list-pub/list-pub.component';
import { EditGroupComponent } from './components/search-group/edit-group/edit-group.component';
import { AddGroupComponent } from './components/search-group/add-group/add-group.component';
import { GroupsUserComponent } from './components/search-group/groups-user/groups-user.component';
import { PubUserComponent } from './components/publication/pub-user/pub-user.component';
import { RegisterComponent } from './components/register/register.component';
import { ListResearchersComponent } from './components/researchers/list-researchers/list-researchers.component';
import { StatComponent } from './components/stat/stat.component';
import { DetailResearcherComponent } from './components/researchers/detail-researcher/detail-researcher.component';


const routes: Routes = [

   
    {path:'',redirectTo:'/login',pathMatch:'full'},///home/presentation
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'home',component:DashboardUserComponent,
     children:[
      {path:'list/annuaire',component:AnnuaireComponent},
      {path:'groupe/recherche' , component:GroupsUserComponent},
      {path:'presentation' , component: PresentationComponent},
      {path:'contact',component:ContactComponent},
      {path:'list/pub',component:PubUserComponent},
      {path:'stat/recherche',component:StatComponent},
      {path:'list/researchers',component:ListResearchersComponent},
      {path:'list/researchers/deatil',component:DetailResearcherComponent}
     
     ]
    },


    {path : 'dashboard',component:DashboardAdminComponent ,
        children: [
          {path:'presentation' , component: PresentationComponent},
          {path:'list/annuaire' , component: ListComponent},
          {path:'groupe/recherche' , component:ListGroupComponent},
          {path:'edit/annuaire/:id' , component: EditComponent},
          {path:'ajouter/annuaire' , component: AjoutComponent},
          {path:'contact',component:ContactComponent},
          {path:'edit/pub/:id' , component: EditPubComponent},
          {path:'add/pub' , component: AddPubComponent},
          {path:'list/pub' , component: ListPubComponent},
          {path:'list/groupe',component:ListGroupComponent},
          {path:'edit/groupe/:id',component:EditGroupComponent},
          {path:'ajouter/groupe',component:AddGroupComponent}


  


        ]
      },

    
]
 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
