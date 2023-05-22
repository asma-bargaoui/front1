import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:"home",
    component: HomeComponent,
    loadChildren: ()=> import('./features/features.module').then(m=>m.FeaturesModule)
  },
  {
    path: "",
    component: HomeComponent,
    loadChildren: ()=> import('./features/features.module').then(m=>m.FeaturesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
