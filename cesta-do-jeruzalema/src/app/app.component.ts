import {Component, OnDestroy, OnInit} from "@angular/core";
import {ApiService} from "./api.service";
import {debounceTime, filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CreateEntry, Entry, Walker} from "./models";
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
    walkers: Walker[] = [];
    achievedDistance = 0;
    achievedPercent = 0;

    isLoading = true;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getEntriesFromApi();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    refresh(): void {
        this.isLoading = true;
        this.getEntriesFromApi();
    }

    private getWalkersFromEntries(entries: Entry[]): Walker[] {
        const walkers: Walker[] = [];
        for (const entry of entries) {
            const foundWalker: Walker = walkers.find((walker: Walker) => walker.name === entry.name);
            if (foundWalker) {
                foundWalker.amount += entry.amount;
                if (foundWalker.longest < entry.amount) {
                    foundWalker.longest = entry.amount;
                }
            } else {
                walkers.push({ name: entry.name, amount: entry.amount, longest: entry.amount });
            }
        }
        return walkers;
    }

    private getEntriesFromApi(): void {
        this.apiService.getEntries().pipe(takeUntil(this.destroy$)).subscribe((entries: Entry[]) => {
            this.entries = entries;
            this.achievedDistance = Math.round(entries
                .map((entry) => entry.amount)
                .reduce((acc: number, current: number) => {
                    return acc + current;
                }, 0));
            this.achievedPercent = this.achievedDistance / (this.totalDistance / 100);
            this.walkers = this.getWalkersFromEntries(entries);
            this.isLoading = false;
        });
    }
}
