import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Chaos } from '../interfaces/chaos';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        public http: HttpClient
    ) { }

    dataSource:MatTableDataSource<any>;

    getDepartures():Observable<Chaos[]> {
        return this.http.get('https://dev.45chaos.com/api/departures')
            .pipe(map((response: Chaos[]) => response));
    }
}
