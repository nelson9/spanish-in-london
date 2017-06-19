import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Contact } from './contact';

///<reference path="node_modules/angular2/typings/browser.d.ts"/>

@Injectable()
export class ContactService {

    constructor(private http: Http) { } 
    private contactUrl: string = "http://localhost:52595/api/Contact";

    sendContactMessage(contact : Contact): Promise<Contact> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.contactUrl, contact, options).toPromise()
            .then(this.extractData)
            .catch();
    }

    private handleError(error: Response | any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body.data);
        return body.data || {};
    }
}