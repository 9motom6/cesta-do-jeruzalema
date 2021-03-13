import {Directive, Input, OnDestroy, OnInit} from "@angular/core";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {map, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Directive({
    selector: "[appResponsiveSidenav]"
})
export class ResponsiveSidenavDirective implements OnInit, OnDestroy {
    @Input() permanentAt: number;
    private destroy$$: Subject<void> = new Subject<void>();

    constructor(
        private breakpoint: BreakpointObserver,
        private sidenav: MatSidenav) {
    }

    ngOnInit(): void {
        const permanent$ = this.breakpoint
            .observe(`(min-width: ${this.permanentAt}px)`)
            .pipe(
                takeUntil(this.destroy$$),
                map(({ matches }) => matches)
            );

        permanent$.subscribe(permanent => {
            this.sidenav.mode = permanent ? "side" : "over";
            this.sidenav.opened = permanent;
        });
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
        this.destroy$$.complete();
    }
}
