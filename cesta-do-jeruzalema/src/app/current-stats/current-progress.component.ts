import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {TOTAL_DISTANCE} from "../constants";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

enum ProgressOptions {
    Sum = "sum",
    Percent = "percent",
    Missing = "missing"
}

@Component({
    selector: "app-current-progress",
    templateUrl: "./current-progress.component.html",
    styleUrls: [ "./current-progress.component.less" ]
})
export class CurrentProgressComponent implements OnInit, AfterViewInit, OnDestroy {
    readonly progressOptions = ProgressOptions;
    readonly totalDistance = TOTAL_DISTANCE;

    @Input()
    achievedDistance = 0;

    @Input()
    achievedPercent = 0;

    @Input()
    onSidebarOpenChange$: Observable<void> = new Observable<void>();

    @ViewChild("chart") elementView: ElementRef;

    destroy$$: Subject<void> = new Subject<void>();
    currentSelectedOption: ProgressOptions = ProgressOptions.Sum;
    innerWidth: number;

    view: any[] = [ 400, 400 ];
    colorScheme = {
        domain: [ "#3f51b5" ]
    };
    value = 50;
    previousValue = 70;
    units = "z " + TOTAL_DISTANCE + " km";

    max = TOTAL_DISTANCE * 100;
    unitFormatterFn: (value) => string = (value) => "Ušli jsme " + value + " km";

    constructor(private cd: ChangeDetectorRef) {
    }

    @HostListener("window:resize", [ "$event" ])
    onResize(): void {
        this.innerWidth = window.innerWidth;
        this.updateChartSize();
    }

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        this.max = TOTAL_DISTANCE + this.achievedDistance;

        this.onSidebarOpenChange$.pipe(takeUntil(this.destroy$$)).subscribe(() => {
            this.updateChartSize();
        });
    }

    selectedChanged(change: MatButtonToggleChange): void {
        this.currentSelectedOption = change.value;
    }


    ngAfterViewInit(): void {
        this.updateChartSize();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
        this.destroy$$.complete();
    }

    private updateChartSize(): void {
        this.view = [ this.elementView?.nativeElement.offsetWidth , this.innerWidth < 599 ? 90 :  150 ];
        this.cd.detectChanges();
    }

}
