import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { CommonService } from "../common.service";
import { ClubsService } from "../clubs.service";
import { AdaptService } from "../adapt.service";
import { DxResponsiveBoxComponent } from "devextreme-angular";


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
    @ViewChild(DxResponsiveBoxComponent) responsiveBox: DxResponsiveBoxComponent;
    searchingParams: any;
    loadingData = true;
    navigate: any;
    adaptOptions: any;
    constructor(private route: ActivatedRoute,
        private clubsService: ClubsService,
        private commonService: CommonService,
        private router: Router,
        private adapt: AdaptService,
        @Inject(DOCUMENT) _document: any) {
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
        this.adapt.setAdaptValue(_document.documentElement.clientWidth);
    }
    adaptation() {
        //this.adapt.setAdaptValue();
    }
    repaint (e: any) {
       if(e) {
           this.responsiveBox.instance.repaint();
       }
    }
    ngOnInit() {
        let that = this;
        this.adaptation();
        this.navigate = this.route.params.subscribe((params: any) => {
            that.searchingParams = that.commonService.getParams();
            that.clubsService.getFoundClubs(that.searchingParams.location).done(function (data: any) {
                that.clubsService.setClubsData(data);
                that.loadingData = false;
            });
        })
    }
}