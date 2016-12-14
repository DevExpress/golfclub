import { NgModule } from "@angular/core";
import { DxPopupModule,
         DxFormModule, 
         DxTemplateModule,
         DxButtonModule,
         DxSchedulerModule,
         DxTextAreaModule } from "devextreme-angular";
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
        DxTemplateModule,
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