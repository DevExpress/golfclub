import { Component, ViewChild, Input } from "@angular/core";
import { ClubsService } from "../../clubs.service";
import { BookComponent } from "../../shared/book/book.component";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonService } from "../../common.service";

const COUNT_DAYS = 1;

@Component({
    selector: "club-list",
    templateUrl: "club-list.component.html",
    styleUrls: ["club-list.component.less"]
})
export class ClubsListComponent {
    @ViewChild(BookComponent, {static: false}) book: BookComponent;
    @Input() adaptOptions: any;
    clubsData: any[] = [];
    dataLoaded = false;
    searchingParams: any;
    bookData: any;
    clubsSubscription: Subscription;
    constructor(private clubsService: ClubsService, private commonService: CommonService, private router: Router) {
        let init = false;
        this.searchingParams = commonService.getParams();
        this.clubsSubscription = this.clubsService.clubsData$.subscribe(items => {
            this.clubsData = items;
            this.dataLoaded = true;
            this.setDataForService(this.clubsData);
        });
        this.clubsService.reservations$.subscribe(reserv => {
            if (init) {
                init = true;
                this.clubsService.setReservation(reserv);
            }
        });
    }
    setDataForService(value: any) {
        let date = new Date(this.searchingParams.startDate);
        this.clubsService.setSchedulerData(value, date);
    }
    popupBook(data: any) {
        this.book.bookVisible = true;
        this.bookData = data;
    }
    goToInfo(e: any) {
        this.router.navigate(["info", {
            location: e.City.Id,
            clubId: e.Id,
            startDate: this.commonService.getFormatDate(new Date()),
            endDate: this.commonService.getFormatDate(this.commonService.addDays(new Date(), COUNT_DAYS)),
            players: 2,
            holes: 9
        }]);
    }
}
