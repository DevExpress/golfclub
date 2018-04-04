import { Component, HostListener } from "@angular/core";
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
    @HostListener("window:resize") onWindowResize() {
        this.adapt.setAdaptValue();
    }
    constructor(private adapt: AdaptService) {
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
        this.adapt.setAdaptValue();
    }
}
