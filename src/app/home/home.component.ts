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
    responsiveHomeItems: any = [{
        location: [{
            row: 0,
            col: 0,
            screen: "lg md sm"
        }, {
            row: 0,
            col: 0,
            colspan: 2,
            screen: "xs"
        }],
        template: "search"
    }, {
        location: [{
            row: 0,
            col: 1,
            screen: "lg md sm"
        }, {
            row: 1,
            col: 0,
            colspan: 2,
            screen: "xs"
        }],
        template: "banner"
    }, {
        location: [{
            row: 1,
            col: 0,
            colspan: 4,
            screen: "lg md sm"
        }, {
            row: 2,
            col: 0,
            screen: "xs"
        }],
        template: "clubsList"
    }, {
        location: [{
            row: 2,
            col: 0,
            screen: "lg md sm"
        }, {
            row: 3,
            col: 0,
            screen: "xs"
        }],
        template: "leftSideInfo"
    }, {
        location: [{
            row: 2,
            col: 1,
            screen: "lg md sm"
        }, {
            row: 4,
            col: 0,
            screen: "xs"
        }],
        template: "rightSideInfo"
    }];
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