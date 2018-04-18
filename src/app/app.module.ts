import { NgModule, enableProdMode } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { DxTemplateModule, DxServerTransferStateModule } from "devextreme-angular";
import { AppComponent } from "./app.component";

import { ClubsService } from "./clubs.service";
import { RoutingModule } from "./app.routing.module";
import { SharedModule } from "./shared/shared.module";
import { HomeModule } from "./home/home.module";
import { ClubsModule } from "./clubs/clubs.module";
import { InfoModule } from "./info/info.module";

enableProdMode();

@NgModule({
    declarations: [AppComponent],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, ClubsService],
    imports: [
        BrowserModule.withServerTransition({ appId: 'golfclub' }),
        DxTemplateModule,
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
