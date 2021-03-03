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
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EntryListComponent,
        LayoutComponent,
        ResponsiveSidenavDirective
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
        ScrollingModule,
        FlexLayoutModule,
        LayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
