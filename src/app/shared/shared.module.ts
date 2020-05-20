import { NgModule } from "@angular/core";

import { DxPopupModule } from "devextreme-angular/ui/popup";
import { DxFormModule } from "devextreme-angular/ui/form";
import { DxButtonModule } from "devextreme-angular/ui/button";
import { DxSchedulerModule } from "devextreme-angular/ui/scheduler";
import { DxTextAreaModule } from "devextreme-angular/ui/text-area";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchPanelComponent } from "./search-panel/search-panel.component";
import { ChangeSearchComponent } from "./change-search/change-search.component";
import { ScheduleComponent } from "./scheduler/schedule.component";
import { BookComponent } from "./book/book.component";


@NgModule({
    imports: [
        CommonModule,
        DxPopupModule,
        DxButtonModule,
        DxSchedulerModule,
        DxFormModule,
        DxTextAreaModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchPanelComponent,
        ChangeSearchComponent,
        ScheduleComponent,
        BookComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SearchPanelComponent,
        ChangeSearchComponent,
        ScheduleComponent,
        BookComponent
    ]
})
export class SharedModule {
}
