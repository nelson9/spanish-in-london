import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule }    from '@angular/http'

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { AppComponent }  from './app.component';
import { AppRoutingModule, routableComponents }  from './app-routing.module';
import { HomeComponent} from './home/home.component';
import { ContactComponent} from './contact/contact.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    declarations: [
        AppComponent, routableComponents, HomeComponent, ContactComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }