import { NgModule } from "@angular/core";
import { DxButtonModule } from "devextreme-angular/ui/button";
import { DxResponsiveBoxModule } from "devextreme-angular/ui/responsive-box";
import { DxLoadPanelModule } from "devextreme-angular/ui/load-panel";
import { DxTemplateModule } from "devextreme-angular/core/dx.template";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { HomeComponent } from "./home.component";
import { BannerComponent } from "./banner/banner.component";
import { ClubsComponent } from "./clubs-list/clubs-list.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DxResponsiveBoxModule,
        DxTemplateModule,
        DxLoadPanelModule,
        DxButtonModule
    ],
    declarations: [
        HomeComponent,
        BannerComponent,
        ClubsComponent
    ],
    exports: [
        HomeComponent,
        BannerComponent,
        ClubsComponent
    ]
})
export class HomeModule {
}