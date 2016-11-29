import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DxButtonModule,
         DxResponsiveBoxModule,
         DxLoadPanelModule,
         DxTemplateModule } from "devextreme-angular";

import { SharedModule } from "../shared/shared.module";
import { DescroptionComponent } from "./description-club/description.component";
import { AddressComponent } from "./address/address.component";
import { InfoComponent } from "./info-club.component";

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