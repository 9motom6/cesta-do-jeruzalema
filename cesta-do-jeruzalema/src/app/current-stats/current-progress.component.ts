import {Component, HostListener, Input, OnInit} from "@angular/core";
import {TOTAL_DISTANCE} from "../constants";
import {MatButtonToggleChange} from "@angular/material/button-toggle";


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
export class CurrentProgressComponent implements OnInit {
    readonly progressOptions = ProgressOptions;
    readonly totalDistance = TOTAL_DISTANCE;

    @Input()
    achievedDistance = 0;

    @Input()
    achievedPercent = 0;

    currentSelectedOption: ProgressOptions = ProgressOptions.Sum;
    innerWidth: any;
    constructor() {
    }

    @HostListener("window:resize", ["$event"])
    onResize(): void {
        this.innerWidth = window.innerWidth;
    }

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
    }

    selectedChanged(change: MatButtonToggleChange): void {
        this.currentSelectedOption = change.value;
    }
}
