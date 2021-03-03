import {Component, OnDestroy, OnInit} from "@angular/core";
import {ApiService} from "./api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CreateEntry, Entry} from "./models";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit, OnDestroy {
    title = "cesta-do-jeruzalema";

    destroy$: Subject<void> = new Subject<void>();
    tasks = "";

    constructor(private appService: ApiService) {
    }

    ngOnInit(): void {
        this.appService.getEntries().pipe(takeUntil(this.destroy$)).subscribe((tasks: { text: string; entries: Entry[] }) => {
            console.log(tasks);
            this.tasks = tasks.text + JSON.stringify(tasks.entries);
        });
    }


    addEntry(): void {
        const entry: CreateEntry = {
            name: "Horys",
            amount: 5,
        };
        this.appService.addEntry(entry).pipe(takeUntil(this.destroy$)).subscribe((resp) => {
            console.log(resp);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
