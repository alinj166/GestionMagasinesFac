import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMagazineComponent } from './Admin/add-magazine/add-magazine.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ErrorComponent } from './Admin/error/error.component';
import { LoginAdminComponent } from './Admin/login-admin/login-admin.component';
import { ReservationListComponent } from './Admin/reservation-list/reservation-list.component';
import { UsersListComponent } from './Admin/users-list/users-list.component';
import { DetailsComponent } from './details/details.component';
import { AdminGuardService } from './guards/admin-guard.service';
import { GuardService } from './guards/guard.service';
import { NoguardService } from './guards/noguard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MagazinesComponent } from './magazines/magazines.component';
import { EditInfoProfilComponent } from './profil/edit-info-profil/edit-info-profil.component';
import { ShowProfilComponent } from './profil/show-profil/show-profil.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'magazines',component:MagazinesComponent},
  {path:'magazines/:id',component:DetailsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,canActivate:[NoguardService] },
  { path: 'loginAdmin', component: LoginAdminComponent,canActivate:[NoguardService] },
  { path: 'register', component: RegisterComponent,canActivate:[NoguardService] },
  { path: 'home', component: HomeComponent },
  { path:'profil',component:ShowProfilComponent,canActivate: [GuardService]},
  { path:'editProfil',component:EditInfoProfilComponent,canActivate: [GuardService]},
  {path:'addMg', component:AddMagazineComponent,canActivate: [AdminGuardService]},
  {path:'dashboard', component:DashboardComponent,canActivate: [AdminGuardService]},
  {path:'users', component:UsersListComponent,canActivate: [AdminGuardService]},
  {path:'reservation', component:ReservationListComponent,canActivate: [AdminGuardService]},
  {path:'magazines/:id/Login',component:LoginComponent,canActivate:[NoguardService]},

  {path:'**', component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
