import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit,  OnDestroy {
  title = 'cesta-do-jeruzalema';

  destroy$: Subject<void> = new Subject<void>();
  tasks: string = "";
  constructor(private appService: ApiService) {}

  ngOnInit() {
    this.appService.getTrackings().pipe(takeUntil(this.destroy$)).subscribe((tasks: {text: string}) => {
      console.log(tasks);
      this.tasks = tasks.text;
    });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
