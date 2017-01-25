import { Component, ViewEncapsulation, NgZone } from "@angular/core";
import { AdaptService } from "./adapt.service";

@Component({
    selector: "golf-club-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.less"],
    encapsulation: ViewEncapsulation.None,
    providers: [AdaptService]
})

export class AppComponent {
    adaptOptions: any;
    constructor(private adapt: AdaptService, zone: NgZone) {
        this.adapt.adapt$.subscribe(item => {
            zone.run(() => {
                this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
            });
        });
    }
    adaptation() {
        this.adapt.setAdaptValue();
    }
    getScreen() {
        let width = window.innerWidth;

        if (width < 768) 
            return "xs";
        else
            return "lg";
    }
    ngOnInit() {
        this.adaptation();
    }
}
