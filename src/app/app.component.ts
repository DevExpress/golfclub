import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
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
    constructor(private adapt: AdaptService, router: Router, @Inject(DOCUMENT) _document: any) {
        this.adapt.adapt$.subscribe(item => {
            //console.log("set opt");
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });

        this.adapt.setAdaptValue(_document.documentElement.clientWidth);
        router.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
                //this.box.instance.repaint();
            }
        });
    }
    adaptation() {
        //this.adapt.setAdaptValue();
    }
    getScreen() {
        let width = 1000;//window.innerWidth;

        if (width < 768)
            return "xs";
        else
            return "lg";
    }
    ngOnInit() {
        this.adaptation();
    }
}
