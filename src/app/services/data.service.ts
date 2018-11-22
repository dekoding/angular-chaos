import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Chaos } from '../interfaces/chaos';
import { Definition } from '../interfaces/definition';
import { Stat } from '../interfaces/stat';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        public http: HttpClient
    ) { }

    baseUrl:string = 'https://dev.45chaos.com';
    departures:string = `${this.baseUrl}/api/departures`;
    definitions:string = `${this.baseUrl}/api/definitions`;
    stats:string = `${this.baseUrl}/api/stats`;

    dataSource:MatTableDataSource<any>;

    getDepartures():Observable<Chaos[]> {
        return this.http.get(this.departures)
            .pipe(map((response: Chaos[]) => response));
    }

    getDefinitions():Observable<Definition[]> {
        return this.http.get(this.definitions)
            .pipe(map((response:any[]) => {
                const result:Definition[] = [];
                const keys:string[] = Object.keys(response);

                keys.forEach(key => {
                    const label = key;
                    const explanation = response[key];

                    result.push({ label, explanation });
                });

                return result;
            }));
    }

    getStats():Observable<Stat> {
        return this.http.get(this.stats)
            .pipe(map((response: Stat) => response));
    }
}
