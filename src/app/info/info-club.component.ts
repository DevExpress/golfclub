import { Component, OnInit, HostListener } from "@angular/core";
import { DatePipe } from "@angular/common";
import { CommonService } from "../common.service";
import { ClubsService } from "../clubs.service";
import { AdaptService } from "../adapt.service";

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
export class InfoComponent implements OnInit {
    searchingParams: any;
    club: any;
    loadingData = true;
    adaptOptions: any;
    @HostListener("window:resize") onWindowResize() {
        this.adapt.setAdaptValue();
    }
    constructor(private clubsService: ClubsService,
        private commonService: CommonService,
        private adapt: AdaptService) {
        let that = this;
        this.searchingParams = commonService.getParams();
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
        this.adapt.setAdaptValue();
    }

    ngOnInit() {
        this.clubsService.getClubById(this.searchingParams.clubId).done((data: any) => {
            this.club = data;
            this.clubsService.setClubsData([data]);
            this.loadingData = false;
        });
    }
}
