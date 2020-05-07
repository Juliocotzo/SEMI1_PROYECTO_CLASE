import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecetaComponent } from './components/receta/receta.component';
import { RecetasComponent } from './components/recetas/recetas.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },{
    path: 'home',
    component: HomeComponent
  },{
    path: 'form',
    component: FormComponent
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'profile',
    component: ProfileComponent
  },{
    path: 'receta/:id',
    component: RecetaComponent
  },{
    path: 'recetas',
    component: RecetasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
