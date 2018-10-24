import { Component } from '@angular/core';
//import { Router, Event, NavigationEnd } from '@angular/router';
//import { DataService } from './services/data.service';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        //public data: DataService,
        //public router: Router
    ) {
        /* router.events.subscribe( (event: Event) => {
            if (event instanceof NavigationEnd) {
                if (router.routerState.snapshot.url === '/') {
                    this.showSearch = true;
                } else {
                    this.showSearch = false;
                }
            }
        }); */
    }

    //showSearch:boolean;

    title = '45 Chaos';

    /* applyFilter(filterValue:string) {
        this.data.dataSource.filter = filterValue.trim().toLowerCase();
    } */
}
