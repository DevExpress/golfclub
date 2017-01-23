import { Component, ViewChild } from "@angular/core";
import { DxResponsiveBoxComponent } from "devextreme-angular/ui/responsive-box";
import { AdaptService } from "../adapt.service";

@Component({
    selector: "home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.less"],
    providers: [AdaptService]
})
export class HomeComponent {
    @ViewChild(DxResponsiveBoxComponent) responsiveBox: DxResponsiveBoxComponent;
    panel: any = {
        location: null,
        startDate: null,
        endDate: null,
        holes: null,
        players: null
    };
    adaptOptions: any;
    constructor(private adapt: AdaptService) {
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
    }
    repaint (e) {
       if(e) {
           this.responsiveBox.instance.repaint();
       }
    }
    adaptation() {
        this.adapt.setAdaptValue();
    }
    ngOnInit() {
        this.adaptation();
    }
    getScreen() {
        var width = window.innerWidth;

        if (width < 768)
            return "xs";
        else
            return "lg";
    }
}