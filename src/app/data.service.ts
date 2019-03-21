import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    constructor(public http: HttpClient) {}

    public getUsers(): Observable<any> {
        return this.http.get('/api/users').pipe(
            map((response) => response));
    }
}