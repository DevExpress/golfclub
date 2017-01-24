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
    items: any = [{
        location: [{
            row: 0,
            col: 0,
            colspan: 1,
            screen: "lg md sm xs"
        }],
        template: "header"
    }, {
        location: [{
            row: 1,
            col: 0,
            colspan: 1,
            screen: "lg md sm xs"
         }],
         template: "content"
    }, {
        location: [{
            row: 1,
            col: 0,
            colspan: 1,
            screen: "lg md sm xs"
        }],
        template: "footer"
    }];
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
