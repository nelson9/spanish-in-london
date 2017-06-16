import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IContact } from './contact';



@Injectable()
export class ContactService {

    constructor(private http: Http) { } 
    private contactUrl: string = "http://localhost:52595/api/Contact";

    sendContactMessage(contact : IContact): Observable<IContact> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
     
        return this.http.post(this.contactUrl, contact, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}