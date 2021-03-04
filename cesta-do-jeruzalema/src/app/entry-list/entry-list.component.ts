import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {Entry} from "../models";

@Component({
    selector: "app-entry-list",
    templateUrl: "./entry-list.component.html",
    styleUrls: [ "./entry-list.component.less" ]
})
export class EntryListComponent implements OnInit, OnChanges {
    @ViewChild("virtualScroll", { static: true })
    public virtualScrollViewport: CdkVirtualScrollViewport;


    @Input()
    entries: Entry[];

    @Input()
    isLoading: boolean;

    constructor() {
    }

    ngOnInit(): void {
        // this.scrollToBottom();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // this.scrollToBottom();  // TODO
    }

    // private scrollToBottom(): void {
    //     setTimeout(() => {
    //         this.virtualScrollViewport.scrollToIndex(
    //             this.entries.length
    //         );
    //         // setTimeout(() => {
    //         //     const items = document.getElementsByClassName("entry");
    //         //     items[items.length - 1].scrollIntoView();
    //         // }, 10);
    //     });
    // }

}

