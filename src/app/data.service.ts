import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    API_URL: string  = 'http://localhost:3000';
    constructor(public http: HttpClient) {}

    public getUsers(): Observable<any> {
        return this.http.get(`${this.API_URL}/api/users`).pipe(
            map((response) => response));
    }

    public getUsersByTerm(term): Observable<any> {
        return this.http.get(`${this.API_URL}/api/` + term).pipe(
            map((response) => response));
    }
}