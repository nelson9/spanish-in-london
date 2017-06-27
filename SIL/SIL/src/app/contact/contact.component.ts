import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map'
import { ContactService } from './contact.service'
import { Contact } from './contact'
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
    templateUrl: './contact.component.html',
    providers: [ContactService]
})

export class ContactComponent {

    constructor(private contactService: ContactService, overlay: Overlay, public modal: Modal) { }

    pageTitle: string = 'Contact';
    submitted = false;

    contact = new Contact("", "", "", "");

    submitForm(value: Contact) {
        this.contactService.sendContactMessage(value)
            .then(result => {
                this.modal.alert()
                    .size('lg')
                    .title('Thanks for getting in contact ' + result.name)
                    .okBtnClass('button special')
                    .body(`              
                        <p>We will get back to you ASAP
                        </p>`)
                    .open();
            })
            .catch(error => {
                this.modal.alert()
                    .size('lg')
                    .title('Oops somewthing went wrong!')
                    .okBtnClass('button special')
                    .body(`              
                        <p>Something happened when submitting your message, please try again, or you cam email at
                        us at <a href="mailto:info@spanishinlondon.com">info@spanishinlondon.com</a>
                        </p>`)
                    .open();
            });

    }
}
