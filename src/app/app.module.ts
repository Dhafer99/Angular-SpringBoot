import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SecurityComponent } from './security/security.component';


const routes: Routes = [
  { path: '', component: HomeComponent },  // default route
  { path: 'View', component: TableComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    TableComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    SecurityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
  exports : [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
