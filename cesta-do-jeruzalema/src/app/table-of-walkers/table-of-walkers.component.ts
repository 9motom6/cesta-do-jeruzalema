import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {Walker} from "../models";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: "app-table-of-walkers",
    templateUrl: "./table-of-walkers.component.html",
    styleUrls: [ "./table-of-walkers.component.less" ]
})
export class TableOfWalkersComponent implements OnInit, OnChanges, AfterViewInit {

    @Input()
    walkers: Walker[];
    displayedColumns: string[] = ["name", "amount", "longest"];

    @ViewChild(MatSort)
    sort: MatSort;

    dataSource = new MatTableDataSource([]);
    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource = new MatTableDataSource(changes.walkers.currentValue);
        this.dataSource.sort = this.sort;
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }
}
