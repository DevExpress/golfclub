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
    repaint (e: any) {
       if(e) {
           //this.responsiveBox.instance.repaint();
       }
    }
    adaptation() {
       // this.adapt.setAdaptValue();
    }
    ngOnInit() {
        this.adaptation();
    }
    getScreen() {
        var width = 1000//window.innerWidth;

        if (width < 768)
            return "xs";
        else
            return "lg";
    }
}