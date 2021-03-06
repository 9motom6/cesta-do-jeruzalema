import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CreateEntry, Walker} from "../models";
import {take} from "rxjs/operators";
import {ApiService} from "../api.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEntryDialogComponent} from "../add-entry-dialog/add-entry-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {END_DATE} from "../constants";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [ "./header.component.less" ]
})
export class HeaderComponent implements OnInit {
    public refreshDisabled = false;

    @Input()
    private walkers: Walker[] = [];

    @Output()
    public sidenavToggle = new EventEmitter();

    @Output()
    public refreshEmitter = new EventEmitter();


    constructor(public dialog: MatDialog,
                private apiService: ApiService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    onToggleSidenav(): void {
        this.sidenavToggle.emit();
    }


    onRefreshClick(): void {
        this.refreshEmitter.emit();
        this.refreshDisabled = true;
        setTimeout(() => {
            this.refreshDisabled = false;
        }, 5000);
    }

    openDialog(): void {
        if (Date.now().valueOf() > END_DATE.valueOf()) {
            this.showTimeoutSnackBar();
            return;
        }

        const dialogRef = this.dialog.open(AddEntryDialogComponent, {
            width: "300px",
            data: this.walkers.map((walker) => walker.name)
        });

        dialogRef.afterClosed().subscribe((newEntry: CreateEntry) => {
            console.log("The dialog was closed", newEntry);
            if (newEntry) {
                newEntry.amount = Math.round((newEntry.amount + Number.EPSILON) * 100) / 100;
                this.apiService.addEntry(newEntry).pipe(take(1)).subscribe((resp: { message: string }) => {
                    console.log(resp);
                    this.snackBar.open(`Přidáno ${newEntry.amount} km pro ${newEntry.name}`, "Ok");
                    this.refreshEmitter.emit();
                }, (error: any) => {
                    console.error(error);
                    if (error?.error?.message === "Time is up!") {
                        this.showTimeoutSnackBar();
                        return;
                    }
                    this.snackBar.open(`Nepodařilo se uložit záznam`, "Ok", {
                        duration: 10000,
                        panelClass: [ "error" ]
                    });
                });
            }
        });
    }

    private showTimeoutSnackBar(): void {
        this.snackBar.open(`Cesta do Jeruzaléma skončila a nelze přidávat další záznamy.`, "Ok", {
            duration: 10000,
            panelClass: [ "error" ],
            verticalPosition: "top"
        });
    }
}
