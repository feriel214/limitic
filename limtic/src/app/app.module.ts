import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { AnnuaireComponent } from './components/annuaire/annuaire.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjoutComponent } from './components/annuaire/ajout/ajout.component';
import { EditComponent } from './components/annuaire/edit/edit.component';
import { ListComponent } from './components/annuaire/list/list.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ListGroupComponent } from './components/search-group/list-group/list-group.component';
import { AddGroupComponent } from './components/search-group/add-group/add-group.component';
import { AddPubComponent } from './components/publication/add-pub/add-pub.component';
import { EditPubComponent } from './components/publication/edit-pub/edit-pub.component';
import { ListPubComponent } from './components/publication/list-pub/list-pub.component';
import { EditGroupComponent } from './components/search-group/edit-group/edit-group.component';
import { GroupsUserComponent } from './components/search-group/groups-user/groups-user.component';
import { PubUserComponent } from './components/publication/pub-user/pub-user.component';
import { RegisterComponent } from './components/register/register.component';
import { StatComponent } from './components/stat/stat.component';
import { ListResearchersComponent } from './components/researchers/list-researchers/list-researchers.component';
import { DetailResearcherComponent } from './components/researchers/detail-researcher/detail-researcher.component';



@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    AnnuaireComponent,
    ContactComponent,
    FooterComponent,
    AjoutComponent,
    EditComponent,
    ListComponent,
    DashboardAdminComponent,
    DashboardUserComponent,
    LoginComponent,
    ListGroupComponent,
    AddGroupComponent,
    AddPubComponent,
    EditPubComponent,
    ListPubComponent,
    EditGroupComponent,
    GroupsUserComponent,
    PubUserComponent,
    RegisterComponent,
    StatComponent,
    ListResearchersComponent,
    DetailResearcherComponent,

  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot([]), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
