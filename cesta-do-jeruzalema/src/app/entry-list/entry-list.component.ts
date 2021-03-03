import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Entry} from "../models";

@Component({
    selector: "app-entry-list",
    templateUrl: "./entry-list.component.html",
    styleUrls: [ "./entry-list.component.less" ]
})
export class EntryListComponent implements OnInit {

    @Input()
    entries: Entry[];

    constructor() {
    }

    ngOnInit(): void {
    }

}

