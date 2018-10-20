import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Chaos } from '../../interfaces/chaos';

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
export class ChaosTableComponent {
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
    dataSource = new ChaosDataSource();

    isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
    expandedElement: any;
}

const data: Chaos[] = [
    {
        Image: "389",
        LeaveType: "R",
        TrumpTime: 703,
        DateLeft: "12/31/2018",
        DateHired: "01/27/2017",
        Affiliation: "State Dept",
        LastName: "Haley",
        Sources: "http://archive.is/gknD9\\nhttp://archive.is/nLbMr",
        Notes: "unknown why resigning; to leave by end of 2018 so \"date left\" is TBD",
        MoochesTime: 70.4,
        TotalTime: 703,
        Position: "US Ambassador to the UN",
        FirstName: "Nikki",
        id: 1
    },
    {
        Image: "389",
        LeaveType: "R",
        TrumpTime: 703,
        DateLeft: "12/31/2018",
        DateHired: "01/27/2017",
        Affiliation: "State Dept",
        LastName: "Haley",
        Sources: "http://archive.is/gknD9\\nhttp://archive.is/nLbMr",
        Notes: "unknown why resigning; to leave by end of 2018 so \"date left\" is TBD",
        MoochesTime: 70.4,
        TotalTime: 703,
        Position: "US Ambassador to the UN",
        FirstName: "Nikki",
        id: 1
    }
];


export class ChaosDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Chaos[]> {
        const rows = [];
        data.forEach(element => rows.push(element, { detailRow: true, element }));
        return of(rows);
    }

    disconnect() { }
}
