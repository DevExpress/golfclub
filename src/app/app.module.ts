import { NgModule } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { DxServerTransferStateModule } from "devextreme-angular/core";
import { AppComponent } from "./app.component";

import { ClubsService } from "./clubs.service";
import { RoutingModule } from "./app.routing.module";
import { SharedModule } from "./shared/shared.module";
import { HomeModule } from "./home/home.module";
import { ClubsModule } from "./clubs/clubs.module";
import { InfoModule } from "./info/info.module";

@NgModule({
    declarations: [AppComponent],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, ClubsService],
    imports: [
        BrowserModule.withServerTransition({ appId: 'golfclub' }),
        DxServerTransferStateModule,
        SharedModule,
        BrowserTransferStateModule,
        HomeModule,
        ClubsModule,
        InfoModule,
        RoutingModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
