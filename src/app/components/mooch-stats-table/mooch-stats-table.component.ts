import { Component, ViewChild, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

import { Stat, StatEntry } from '../../interfaces/stat';
import { DataService } from '../../services/data.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-mooch-stats-table',
    templateUrl: './mooch-stats-table.component.html',
    styleUrls: ['./mooch-stats-table.component.css']
})
export class MoochStatsTableComponent implements OnInit {
    @ViewChild('leaveChart') leaveChartElem: ElementRef;

    constructor(
        public renderer: Renderer2,
        public data: DataService
    ) { }

    charts = {
        leaveTypes: Chart,
        affiliations: Chart
    };

    chartOptions = {
        leaveTypes: {
            config: {
        		type: 'pie',
        		data: {
        			datasets: [/* {
        				data: [
        					randomScalingFactor(),
        					randomScalingFactor(),
        					randomScalingFactor(),
        					randomScalingFactor(),
        					randomScalingFactor(),
        				],
        				backgroundColor: [
        					/* window.chartColors.red,
        					window.chartColors.orange,
        					window.chartColors.yellow,
        					window.chartColors.green,
        					window.chartColors.blue,
        				],
        				label: 'Leave Types'
        			} */],
        			labels: [
        				/* 'Red',
        				'Orange',
        				'Yellow',
        				'Green',
        				'Blue' */
        			]
        		},
        		options: {
        			responsive: true
        		}
        	}
        },
        affiliations: {
            config: {
        		type: 'pie',
        		data: {
        			datasets: [],
        			labels: []
        		},
        		options: {
        			responsive: true
        		}
        	}
        }
    }

    statsTable:Array<{string: string|number}> = [];

    leaveTypes:StatEntry[] = [];
    affiliations:StatEntry[] = [];



    ngOnInit() {
        this.data.getStats()
            .subscribe(results => {
                this.leaveTypes = results.leaveTypes;
                this.affiliations = results.affiliationStats;

                const leaveTypesData = {
                    data: [],
    				backgroundColor: ['red','blue','yellow','green'],
    				label: 'Leave Types'
                };

                const leaveTypesLabels = [];

                results.leaveTypes.forEach(entry => {
                    leaveTypesData.data.push(entry.count);
                    leaveTypesLabels.push(entry.label);
                });

                this.chartOptions.leaveTypes.config.data.datasets.push(leaveTypesData);
                this.chartOptions.leaveTypes.config.data.labels = leaveTypesLabels;

                const ctx = this.leaveChartElem.nativeElement.getContext('2d');
                console.log(this.chartOptions.leaveTypes.config);

                this.charts.leaveTypes = new Chart(this.leaveChartElem.nativeElement, this.chartOptions.leaveTypes.config)

            });
    }

}
