import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {CreateEntry} from "../models";
import {take} from "rxjs/operators";
import {ApiService} from "../api.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [ "./header.component.less" ]
})
export class HeaderComponent implements OnInit {

    @Output()
    public sidenavToggle = new EventEmitter();

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
    }

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
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
