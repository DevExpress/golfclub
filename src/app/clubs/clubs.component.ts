import { Component, OnInit, ViewChild } from "@angular/core";
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
    responsiveClubsPageItems: any = [{
        location: [{
            row: 0,
            col: 0,
            screen: "lg md sm"
        }, {
            row: 0,
            col: 0,
            screen: "xs"
        }],
        template: "searchingInfo"
    }, {
        location: [{
            row: 0,
            col: 1,
            screen: "lg md sm"
        }, {
            row: 1,
            col: 0,
            screen: "xs"
        }],
        template: "search"
    }, {
        location: [{
            row: 1,
            col: 0,
            colspan: 2,
            screen: "lg md sm"
        }, {
            row: 2,
            col: 0,
            screen: "xs"
        }],
        template: "searchingResult"
    }];
    searchingParams: any;
    loadingData: boolean = true;
    navigate: any;
    adaptOptions: any;
    constructor(private route: ActivatedRoute,
        private clubsService: ClubsService,
        private commonService: CommonService,
        private router: Router,
        private adapt: AdaptService) {
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
    }
    adaptation() {
        this.adapt.setAdaptValue();
    }
    repaint (e) {
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