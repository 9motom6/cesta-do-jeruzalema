import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Entry} from "../models";
import {takeUntil} from "rxjs/operators";
import * as moment from "moment";

interface ChartData {
    name: string;
    value: number;
}

@Component({
    selector: "app-km-in-days-bar-chart",
    templateUrl: "./km-in-days-bar-chart.component.html",
    styleUrls: [ "./km-in-days-bar-chart.component.less" ]
})
export class KmInDaysBarChartComponent implements OnInit, OnDestroy {
    @Input()
    entries$: Observable<Entry[]> = new Observable<Entry[]>();
    destroy$$: Subject<void> = new Subject<void>();
    kmInDays: ChartData[];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = "Km";
    showYAxisLabel = true;
    yAxisLabel = "Datum";

    colorScheme = {
        domain: [ "#5AA454", "#A10A28", "#C7B42C", "#AAAAAA" ]
    };

    constructor() {
    }

    ngOnInit(): void {
        this.entries$.pipe(takeUntil(this.destroy$$)).subscribe((entries: Entry[]) => {
            this.kmInDays = entries // Add sort
                .map((entry: Entry) => ({ name: moment(entry.date).format("D.M."), value: entry.amount }))
                .reduce((acc: ChartData[], current: ChartData) => {
                    const chartData = acc.find((data: ChartData) => data.name === current.name);
                    if (!chartData) {
                        acc.push({ ...current });
                    } else {
                        chartData.value += current.value;
                    }
                    return acc;
                }, []);

        });
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
        this.destroy$$.complete();
    }


}
