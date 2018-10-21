import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { Chaos } from '../../interfaces/chaos';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-chaos-table',
    templateUrl: './chaos-table.component.html',
    styleUrls: ['./chaos-table.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ],
})
export class ChaosTableComponent implements OnInit {
    constructor(
        public data: DataService
    ) {
        this.data.getDepartures()
            .subscribe(results => {
                results.forEach(element => this.list.push(element, { detailRow: true, element }));
                this.data.dataSource = new MatTableDataSource<any>(this.list);
            });
    }

    ngOnInit() {
        this.data.dataSource.sort = this.sort;
    }

    @ViewChild(MatSort) sort: MatSort;

    list:any[] = [];

    displayedColumns = [
        'name',
        'affiliation',
        'position',
        'hired',
        'left',
        'totalDays',
        'daysUnderTrump',
        'mooches',
        'firedOrResigned'
    ];

    isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
    expandedElement: any;
}
