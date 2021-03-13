import {Component, OnDestroy, OnInit} from "@angular/core";
import {ApiService} from "./api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Entry, Walker} from "./models";
import {START_DATE, TOTAL_DISTANCE} from "./constants";
import * as moment from "moment";
import {Moment} from "moment";

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
    finishEstimate: Moment;
    averageDailyDistance: number;
    entries$: Subject<Entry[]> = new Subject<Entry[]>();

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getEntriesFromApi(false);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    refresh(): void {
        this.isLoading = true;
        this.getEntriesFromApi(true);

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

    private getEntriesFromApi(isRefresh: boolean): void {
        this.apiService.getEntries().pipe(takeUntil(this.destroy$)).subscribe((entries: Entry[]) => {
            if (isRefresh) {
                entries.forEach((newEntry: Entry) => newEntry.isNew =
                    !this.entries.find((oldEntry: Entry) => oldEntry.id === newEntry.id));
            }
            this.entries = entries;
            this.achievedDistance = Math.round(entries
                .map((entry) => entry.amount)
                .reduce((acc: number, current: number) => {
                    return acc + current;
                }, 0));
            this.achievedPercent = this.achievedDistance / (this.totalDistance / 100);
            this.finishEstimate = this.getFinishEstimate(this.achievedDistance);

            this.walkers = this.getWalkersFromEntries(entries);
            this.entries$.next(entries);
            this.isLoading = false;
        });
    }

    private getFinishEstimate(achievedDistance: number): Moment {
        this.averageDailyDistance = achievedDistance / moment().diff(moment(START_DATE), "days") + 1;
        return moment().add(TOTAL_DISTANCE / this.averageDailyDistance, "days");
    }
}
