import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { DxResponsiveBoxComponent } from "devextreme-angular/ui/responsive-box";
import { AdaptService } from "./adapt.service";

@Component({
    selector: "golf-club-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.less"],
    encapsulation: ViewEncapsulation.None,
    providers: [AdaptService]
})

export class AppComponent {
    @ViewChild(DxResponsiveBoxComponent) box: DxResponsiveBoxComponent;
    adaptOptions: any;
    constructor(private adapt: AdaptService, router: Router) {
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
        router.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
                this.box.instance.repaint();
            }
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
