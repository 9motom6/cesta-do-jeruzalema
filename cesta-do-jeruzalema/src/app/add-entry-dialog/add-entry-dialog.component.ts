import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateEntry, Walker} from "../models";
import {FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

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
    nameControl: FormControl = new FormControl("", [ Validators.required, Validators.minLength(3), Validators.maxLength(15) ]);
    amountControl: FormControl = new FormControl(0, [ Validators.min(0.1), Validators.max(50) ]);

    filteredOptions: Observable<string[]>;

    constructor(public dialogRef: MatDialogRef<AddEntryDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: string[]) {
    }

    ngOnInit(): void {
        this.filteredOptions = this.nameControl.valueChanges
            .pipe(
                startWith(""),
                map(value => typeof value === "string" ? value : value.name),
                map(name => name ? this._filter(name) : this.data.slice())
            );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        if (this.nameControl.valid && this.amountControl.valid) {
            this.dialogRef.close(this.entry);
            return;
        }

        this.nameControl.markAsTouched();
        this.amountControl.markAsTouched();

    }

    getNameErrorMessage(): string {
        if (this.nameControl.hasError("required")) {
            return "Musíš zadat jméno";
        }

        if (this.nameControl.hasError("minlength")) {
            return "Jméno musí mít aspoň 3 znaky";
        }

        if (this.nameControl.hasError("maxlength")) {
            return "Jméno musí mít maximálně 15 znaků";
        }

        return "";
    }


    displayFn(walker: string): string {
        return walker || "";
    }

    getAmountErrorMessage(): string {
        if (this.amountControl.hasError("required")) {
            return "Musíš zadat délku cesty";
        }

        if (this.amountControl.hasError("min")) {
            return "Minimální délka zadané cesty je 0.1km";
        }

        if (this.amountControl.hasError("max")) {
            return "Maximální délka zadané cesty je 50km";
        }

        return "";
    }

    private _filter(name: string): string[] {
        const filterValue = name.toLowerCase();

        return this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
}
