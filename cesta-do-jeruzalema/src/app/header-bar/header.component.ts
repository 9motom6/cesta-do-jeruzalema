import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {CreateEntry} from "../models";
import {take} from "rxjs/operators";
import {ApiService} from "../api.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEntryDialogComponent} from "../add-entry-dialog/add-entry-dialog.component";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [ "./header.component.less" ]
})
export class HeaderComponent implements OnInit {

    @Output()
    public sidenavToggle = new EventEmitter();

    constructor(public dialog: MatDialog,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
    }

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddEntryDialogComponent, {
            width: "250px",
            data: {name: "name", animal: "animal"}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("The dialog was closed", result);
            // this.animal = result;
        });
    }

    addEntry(): void {
        const entry: CreateEntry = {
            name: "Horys",
            amount: 5,
        };
        this.apiService.addEntry(entry).pipe(take(1)).subscribe((resp: { message: string }) => {
            console.log(resp);
        });
    }
}
