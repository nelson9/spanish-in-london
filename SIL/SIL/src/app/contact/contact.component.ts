import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map'
import { ContactService } from './contact.service'
import { Contact } from './contact'

@Component({
    templateUrl: './contact.component.html',
    providers: [ContactService]
})

export class ContactComponent {

    constructor(private contactService: ContactService) { }

    pageTitle: string = 'Contact';
    submitted = false;
    
    contact = new Contact("","","","");

    submitForm(value: Contact) {      
        this.contactService.sendContactMessage(value);
    }
}
