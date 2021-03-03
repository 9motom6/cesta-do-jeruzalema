import {Component, OnDestroy, OnInit} from "@angular/core";
import {ApiService} from "./api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CreateEntry, Entry} from "./models";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: [ "./app.component.less" ]
})
export class AppComponent implements OnInit, OnDestroy {
    title = "cesta-do-jeruzalema";

    destroy$: Subject<void> = new Subject<void>();
    entries: Entry[] = [];

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.apiService.getEntries().pipe(takeUntil(this.destroy$)).subscribe((entries: { entries: Entry[] }) => {
            this.entries = entries.entries;
            console.log(this.entries);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
