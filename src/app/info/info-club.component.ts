import { Component, ViewChild } from "@angular/core";
import { DatePipe } from "@angular/common";
import { CommonService } from "../common.service";
import { ClubsService } from "../clubs.service";
import { AdaptService } from "../adapt.service";
import { DxResponsiveBoxComponent } from "devextreme-angular/ui/responsive-box";

@Component({
    selector: "info",
    templateUrl: "info-club.component.html",
    styleUrls: ["info-club.component.less"],
    providers: [
        CommonService,
        AdaptService,
        DatePipe
    ]
})
export class InfoComponent {
    @ViewChild(DxResponsiveBoxComponent) responsiveBox: DxResponsiveBoxComponent;
    searchingParams: any;
    club: any;
    loadingData = true;
    adaptOptions: any;
    constructor(private clubsService: ClubsService,
        private commonService: CommonService,
        private adapt: AdaptService) {
        let that = this;
        this.searchingParams = commonService.getParams();
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
        clubsService.getClubById(that.searchingParams.clubId).done(function (data: any) {
            that.club = data;
            that.clubsService.setClubsData([data]);
            that.loadingData = false;
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
}