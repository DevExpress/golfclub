
import { Component, Output, EventEmitter } from "@angular/core";
import { OfferService } from "../../offer.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { CommonService } from "../../common.service";

const COUNT_DAYS = 1;

@Component({
    selector: "banner",
    templateUrl: "banner.component.html",
    styleUrls: ["banner.component.less"],
    providers: [
        OfferService, 
        CommonService, 
        DatePipe
    ]
})
export class BannerComponent {
    offer: any[];
    @Output() dataLoaded = new EventEmitter<boolean>();;
    name: string;
    constructor(private offerService: OfferService,
        private common: CommonService,
        private router: Router,
        private datePipe: DatePipe) {
        let that = this,
            offer: any = this.offerService.getOffer();
        offer.done(function (data: any) {
            that.offer = data;
            that.name = data.Name;
            that.dataLoaded.emit(true);
        });
    }
    goToInfo(e: any) {
        this.router.navigate(["info", {
            location: e.CityId,
            clubId: e.Id,
            startDate: this.common.getFormatDate(new Date()),
            endDate: this.common.getFormatDate(this.common.addDays(new Date(), COUNT_DAYS)),
            players: 2,
            holes: 18
        }]);
    }
}