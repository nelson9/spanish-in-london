import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component'
import {ContactComponent} from './contact/contact.component'
///<reference path="node_modules/angular2/typings/browser.d.ts"/>
import {PageNotFoundComponent} from './page-not-found.component';

const routes: Routes = [
     { path: 'home', component: HomeComponent },
     { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule{}

export const routableComponents = [PageNotFoundComponent];
    
 