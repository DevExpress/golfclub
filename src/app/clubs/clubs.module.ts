import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DxButtonModule } from "devextreme-angular/ui/button";
import { DxResponsiveBoxModule } from "devextreme-angular/ui/responsive-box";
import { DxLoadPanelModule } from "devextreme-angular/ui/load-panel";
import { DxTemplateModule } from "devextreme-angular/core/dx.template";

import { SharedModule } from "../shared/shared.module";
import { ClubsComponent } from "./clubs.component";
import { SearchingInfoComponent } from "./searching-info/searching-info.component"
import { ClubsListComponent } from "./clubs-list/club-list.component"

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DxResponsiveBoxModule,
        DxTemplateModule,
        DxLoadPanelModule,
        DxButtonModule
    ],
    declarations: [
        ClubsComponent,
        SearchingInfoComponent,
        ClubsListComponent
    ],
    exports: [
        ClubsComponent,
        SearchingInfoComponent,
        ClubsListComponent
    ]
})
export class ClubsModule {
}