import { Component, ViewChild, Input } from "@angular/core";
import { ClubsService } from "../../clubs.service";
import { BookComponent } from "../../shared/book/book.component";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { CommonService } from "../../common.service";

const COUNT_DAYS = 1;

@Component({
    selector: "club-list",
    templateUrl: "club-list.component.html",
    styleUrls: ["club-list.component.less"]
})
export class ClubsListComponent {
    @ViewChild(BookComponent) book: BookComponent;
    @Input() adaptOptions: any;
    clubsData: any[] = [];
    searchingParams: any;
    bookData: any;
    clubsSubscription: Subscription;
    constructor(private clubsServise: ClubsService, private commonService: CommonService, private router: Router) {
        let init = false;
        this.searchingParams = commonService.getParams();
        this.clubsSubscription = this.clubsServise.clubsData$.subscribe(items => {
            this.clubsData = items;
            this.setDataForService(this.clubsData);
        });
        this.clubsServise.reservations$.subscribe(reserv => {
            if (init) {
                init = true;
                this.clubsServise.setReservation(reserv);
            }
        })
    }
    setDataForService(value: any) {
        let date = new Date(this.searchingParams.startDate);
        this.clubsServise.setSchedulerData(value, date);
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