import { Component, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { AdaptService } from "../adapt.service";

@Component({
    selector: "home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.less"],
    providers: [AdaptService]
})
export class HomeComponent {
    panel: any = {
        location: null,
        startDate: null,
        endDate: null,
        holes: null,
        players: null
    };
    adaptOptions: any;
    constructor(private adapt: AdaptService, @Inject(DOCUMENT) _document: any) {
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
        this.adapt.setAdaptValue(_document.documentElement.clientWidth);
    }
}