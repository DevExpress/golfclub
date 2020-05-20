import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DxButtonModule } from "devextreme-angular/ui/button";
import { DxLoadIndicatorModule } from "devextreme-angular/ui/load-indicator";
import { DxLoadPanelModule } from "devextreme-angular/ui/load-panel";

import { SharedModule } from "../shared/shared.module";
import { DescroptionComponent } from "./description-club/description.component";
import { AddressComponent } from "./address/address.component";
import { InfoComponent } from "./info-club.component";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DxLoadPanelModule,
        DxLoadIndicatorModule,
        DxButtonModule
    ],
    declarations: [
        InfoComponent,
        DescroptionComponent,
        AddressComponent
    ],
    exports: [
        InfoComponent,
        DescroptionComponent,
        AddressComponent
    ]
})
export class InfoModule {
}