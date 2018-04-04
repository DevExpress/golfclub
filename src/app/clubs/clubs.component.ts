import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { CommonService } from "../common.service";
import { ClubsService } from "../clubs.service";
import { AdaptService } from "../adapt.service";

@Component({
    selector: "clubs",
    templateUrl: "clubs.component.html",
    styleUrls: ["clubs.component.less"],
    providers: [
        ClubsService,
        AdaptService,
        CommonService,
        DatePipe
    ]
})
export class ClubsComponent implements OnInit {
    searchingParams: any;
    loadingData = true;
    navigate: any;
    adaptOptions: any;
    @HostListener("window:resize") onWindowResize() {
        this.adapt.setAdaptValue();
    }
    constructor(private route: ActivatedRoute,
        private clubsService: ClubsService,
        private commonService: CommonService,
        private router: Router,
        private adapt: AdaptService) {
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
        this.adapt.setAdaptValue();
    }
    ngOnInit() {
        let that = this;
        this.navigate = this.route.params.subscribe((params: any) => {
            that.searchingParams = that.commonService.getParams();
            that.clubsService.getFoundClubs(that.searchingParams.location).done(function (data: any) {
                that.clubsService.setClubsData(data);
                that.loadingData = false;
            });
        });
    }
}
