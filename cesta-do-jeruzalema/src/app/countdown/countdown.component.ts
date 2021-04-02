import {Component, HostListener, Input, OnInit} from "@angular/core";
import {END_DATE, TOTAL_DISTANCE} from "../constants";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import * as moment from "moment";
import {Duration, Moment} from "moment";
import "moment/min/locales";

enum CountdownOptions {
    Countdown = "countdown",
    EndDate = "endDate",
    Estimate = "estimate"
}

@Component({
    selector: "app-countdown",
    templateUrl: "./countdown.component.html",
    styleUrls: [ "./countdown.component.less" ]
})
export class CountdownComponent implements OnInit {
    readonly countdownOptions = CountdownOptions;
    readonly totalDistance = TOTAL_DISTANCE;

    currentSelectedOption: CountdownOptions = CountdownOptions.Countdown;
    innerWidth: number;
    currentTimeLeft: Duration;
    interval;
    @Input()
    achievedDistance = 0;

    @Input()
    finishEstimate: Moment;

    @Input()
    averageDailyDistance: number;

    constructor() {
    }

    @HostListener("window:resize", [ "$event" ])
    onResize(): void {
        this.innerWidth = window.innerWidth;
    }

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;

        this.interval = setInterval(() => {
            this.currentTimeLeft = moment.duration(-moment().diff(END_DATE));
            if (this.currentTimeLeft < moment.duration(0)) {
                this.currentTimeLeft = moment.duration(0);
                clearInterval(this.interval);
            }
        }, 1000);
    }

    selectedChanged(change: MatButtonToggleChange): void {
        this.currentSelectedOption = change.value;
    }
}
