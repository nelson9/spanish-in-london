"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var contact_service_1 = require("./contact.service");
var contact_1 = require("./contact");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var ContactComponent = (function () {
    function ContactComponent(contactService, overlay, modal) {
        this.contactService = contactService;
        this.modal = modal;
        this.pageTitle = 'Contact';
        this.submitted = false;
        this.contact = new contact_1.Contact("", "", "", "");
    }
    ContactComponent.prototype.submitForm = function (value) {
        var _this = this;
        this.contactService.sendContactMessage(value)
            .then(function (result) {
            _this.modal.alert()
                .size('lg')
                .title('Thanks for getting in contact ' + result.name)
                .okBtnClass('button special')
                .body("              \n                        <p>We will get back to you ASAP\n                        </p>")
                .open();
        })
            .catch(function (error) {
            _this.modal.alert()
                .size('lg')
                .title('Oops somewthing went wrong!')
                .okBtnClass('button special')
                .body("              \n                        <p>Something happened when submitting your message, please try again, or you cam email at\n                        us at <a href=\"mailto:info@spanishinlondon.com\">info@spanishinlondon.com</a>\n                        </p>")
                .open();
        });
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        templateUrl: './contact.component.html',
        providers: [contact_service_1.ContactService]
    }),
    __metadata("design:paramtypes", [contact_service_1.ContactService, angular2_modal_1.Overlay, bootstrap_1.Modal])
], ContactComponent);
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map