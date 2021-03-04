import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "./header-bar/header.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {EntryListComponent} from "./entry-list/entry-list.component";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {LayoutComponent} from "./layout/layout.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { ResponsiveSidenavDirective } from "./directives/responsive-sidenav.directive";
import {LayoutModule} from "@angular/cdk/layout";
import { AddEntryDialogComponent } from "./add-entry-dialog/add-entry-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule} from "@angular/forms";
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EntryListComponent,
        LayoutComponent,
        ResponsiveSidenavDirective,
        AddEntryDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        OverlayModule,
        MatDialogModule,
        ScrollingModule,
        FlexLayoutModule,
        LayoutModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
