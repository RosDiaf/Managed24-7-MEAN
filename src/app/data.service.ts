import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    API_URL = 'http://localhost:3000';
    constructor(public http: HttpClient) {}

    public getUsers(): Observable<any> {
        return this.http.get(`${this.API_URL}/api/users`).pipe(
            map((response) => response));
    }

    public setUsers(user: object): any {
        return this.http.post(`${this.API_URL}/api/users/add`, user);
    }

    public deleteUsers(id: any): Observable<any> {
        return this.http.delete(`${this.API_URL}/api/users/remove/` + id);
    }

    public getUsersByTerm(term): Observable<any> {
        return this.http.get(`${this.API_URL}/api/` + term).pipe(
            map((response) => response));
    }

    public getEmployee(): Observable<any> {
        return this.http.get(`${this.API_URL}/api/users/employee`).pipe(
            map((response) => response));
    }
}
