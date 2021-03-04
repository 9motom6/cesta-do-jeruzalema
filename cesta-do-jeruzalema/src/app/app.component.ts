import {Component, OnDestroy, OnInit} from "@angular/core";
import {ApiService} from "./api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CreateEntry, Entry} from "./models";
import {TOTAL_DISTANCE} from "./constants";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: [ "./app.component.less" ]
})
export class AppComponent implements OnInit, OnDestroy {
    readonly totalDistance = TOTAL_DISTANCE;

    destroy$: Subject<void> = new Subject<void>();
    entries: Entry[] = [];
    achievedDistance = 0;
    achievedPercent = 0;

    isLoading = true;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.apiService.getEntries().pipe(takeUntil(this.destroy$)).subscribe((entries: Entry[]) => {
            this.entries = entries;
            this.achievedDistance = entries
                .map((entry) => entry.amount)
                .reduce((acc: number, current: number) => {
                    return acc + current;
                }, 0);
            this.achievedPercent = this.achievedDistance / (this.totalDistance /  100);
            console.log(this.achievedPercent);
            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
