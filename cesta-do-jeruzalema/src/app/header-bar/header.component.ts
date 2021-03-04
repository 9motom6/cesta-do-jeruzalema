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
            data: {name: "name", animal: "animal"} // TODO pass entries and hint existing users
        });

        dialogRef.afterClosed().subscribe((newEntry: CreateEntry) => {
            console.log("The dialog was closed", newEntry);
            if (newEntry) {
                this.apiService.addEntry(newEntry).pipe(take(1)).subscribe((resp: { message: string }) => {
                    console.log(resp);
                });
            }
        });
    }
}
