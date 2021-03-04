import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateEntry} from "../models";

class DialogOverviewExampleDialog {
}

@Component({
    selector: "app-add-entry-dialog",
    templateUrl: "./add-entry-dialog.component.html",
    styleUrls: [ "./add-entry-dialog.component.less" ]
})
export class AddEntryDialogComponent implements OnInit {

    entry: CreateEntry = {
        amount: 0,
        name: ""
    };

    constructor( public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
