import { Component, Input, Output, OnDestroy, EventEmitter } from "@angular/core";
import { ClubsService } from "../../clubs.service";
import { CommonService } from "../../common.service";
import { Subscription } from "rxjs";

@Component({
    selector: "searching-info",
    templateUrl: "searching-info.component.html",
    styleUrls: ["searching-info.component.less"]
})
export class SearchingInfoComponent implements OnDestroy {
    searchingParams: any;
    @Output() dataLoaded = new EventEmitter<boolean>();
    dataInfo: any;
    startDate: Date;
    infoVisible = false;
    subscription: Subscription;
    endDate: Date;
    constructor(private clubsServise: ClubsService, private commonService: CommonService) {
        this.searchingParams = this.commonService.getParams();
        this.subscription = clubsServise.clubsData$.subscribe(items => {
            this.dataInfo = items[0];
            this.infoVisible = true;
            this.setDate();
            this.dataLoaded.emit(true);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    setDate() {
        this.startDate = new Date(this.searchingParams.startDate);
        this.endDate = new Date(this.searchingParams.endDate);
    }
}
