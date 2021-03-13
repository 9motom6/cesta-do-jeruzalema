import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Entry} from "../models";
import {takeUntil} from "rxjs/operators";
import * as moment from "moment";
import {Moment} from "moment";

interface ChartData {
    name: string;
    value: number;
}

@Component({
    selector: "app-km-in-days-bar-chart",
    templateUrl: "./km-in-days-bar-chart.component.html",
    styleUrls: [ "./km-in-days-bar-chart.component.less" ]
})
export class KmInDaysBarChartComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input()
    entries$: Observable<Entry[]> = new Observable<Entry[]>();

    @Input()
    onSidebarOpenChange$: Observable<void> = new Observable<void>();

    @ViewChild("chart") elementView: ElementRef;

    destroy$$: Subject<void> = new Subject<void>();
    kmInDays: ChartData[];

    // options
    view = [ undefined, 300 ];
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = "Datum";
    showYAxisLabel = true;
    yAxisLabel = "Vzdálenost";

    colorScheme = {
        domain: [ "#3f51b5" ]
    };

    constructor() {
    }

    ngOnInit(): void {
        this.entries$.pipe(takeUntil(this.destroy$$)).subscribe((entries: Entry[]) => {
            this.kmInDays = entries
                .map((entry: Entry) => ({ moment: moment(entry.date), value: entry.amount }))
                .reduce((acc: { moment: Moment, value: number }[], current: { moment: Moment, value: number }) => {
                    const chartData = acc.find((data: { moment: Moment, value: number }) => data.moment.isSame(current.moment, "days"));
                    if (!chartData) {
                        acc.push({ ...current });
                    } else {
                        chartData.value += current.value;
                    }
                    return acc;
                }, [])
                .sort((a, b) => a.moment.diff(b.moment))
                .map((entry: { moment: Moment, value: number }) => ({ name: moment(entry.moment).format("D.M."), value: entry.value }));

        });

        this.onSidebarOpenChange$.pipe(takeUntil(this.destroy$$)).subscribe(() => {
            this.updateChartSize();
        });
    }

    ngAfterViewInit(): void {
        this.updateChartSize();
    }

    @HostListener("window:resize", [ "$event" ])
    onResize(): void {
        this.updateChartSize();
    }


    private updateChartSize(): void {
        this.view = [ this.elementView.nativeElement.offsetWidth, 300 ];
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
        this.destroy$$.complete();
    }


}
