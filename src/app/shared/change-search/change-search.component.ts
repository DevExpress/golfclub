import { Component, ViewChild, Input } from "@angular/core";
import { DxPopupComponent } from "devextreme-angular/ui/popup";

@Component({
    selector: "change-search",
    templateUrl: "change-search.component.html",
    styleUrls: ["change-search.component.less"]
})
export class ChangeSearchComponent {
    @ViewChild(DxPopupComponent, {static: false}) search: DxPopupComponent;
    @Input() params: any;
    @Input() adaptOptions: any;
    changeSearchVisible = false;
    hideSearch() {
        this.search.instance.hide();
    }
}
