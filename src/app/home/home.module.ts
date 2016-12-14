import { NgModule } from "@angular/core";
import { DxButtonModule,
         DxResponsiveBoxModule,
         DxLoadPanelModule,
         DxTemplateModule } from "devextreme-angular";
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