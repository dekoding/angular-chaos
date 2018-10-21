import { Component, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef } from '@angular/material';

import { Chaos } from '../../interfaces/chaos';
import { DataService } from '../../services/data.service';

import { DetailComponent } from './detail/detail.component';

@Component({
    selector: 'app-chaos-table',
    templateUrl: './chaos-table.component.html',
    styleUrls: ['./chaos-table.component.css']
})
export class ChaosTableComponent {
    constructor(
        public dialog: MatDialog,
        public data: DataService
    ) {
        this.data.getDepartures()
            .subscribe(results => {
                results.forEach(element => this.list.push(element));
                this.data.dataSource = new MatTableDataSource<any>(this.list);
                this.data.dataSource.sort = this.sort;
                this.data.dataSource.paginator = this.paginator;
            });
    }

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

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

    openDialog(element: Chaos): void {
        const dialogRef = this.dialog.open(DetailComponent, {
            width: '80%',
            data: element
        });
    }
}
