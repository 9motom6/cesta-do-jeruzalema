import {Component, Input, OnChanges, QueryList, SimpleChanges, ViewChild, ViewChildren} from "@angular/core";
import {Entry} from "../models";
import {MatRipple} from "@angular/material/core";

@Component({
    selector: "app-entry-list",
    templateUrl: "./entry-list.component.html",
    styleUrls: [ "./entry-list.component.less" ]
})
export class EntryListComponent implements OnChanges {

    @ViewChildren(MatRipple) viewChildren: QueryList<MatRipple>;

    @Input()
    entries: Entry[];

    @Input()
    isLoading: boolean;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.entries) {
            setTimeout(() => this.viewChildren.forEach(
                (child) => child.launch({
                    centered: true,
                    animation: { enterDuration: 700, exitDuration: 1500 },
                    color: "#3f51b5d1"
                })), 200);


        }
    }


}

