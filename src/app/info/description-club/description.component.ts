import { Component, Input, ViewChild, OnDestroy } from "@angular/core";
import { DatePipe } from "@angular/common";
import { CommonService } from "../../common.service";
import { ClubsService } from "../../clubs.service";
import { Subscription } from "rxjs";
import { BookComponent } from "../../shared/book/book.component";

@Component({
    selector: "descroption",
    templateUrl: "description.component.html",
    styleUrls: ["description.component.less"],
    providers: [CommonService, DatePipe]
})

export class DescroptionComponent implements OnDestroy {
    @ViewChild(BookComponent, {static: false}) book: BookComponent;
    @Input() adaptOptions: any;
    club: any[] = [];
    bookData: any;
    searchingParams: any;
    buttonTemplate = "buttonLoadingTemplate";
    descriptionVisible = false;
    clubsDataSubscription: Subscription;
    reservationSubscription: Subscription;
    constructor(private clubsService: ClubsService,
        private commonService: CommonService,
        private datePipe: DatePipe) {
        let init = false;
        this.searchingParams = commonService.getParams();
        this.clubsDataSubscription = this.clubsService.clubsData$.subscribe(items => {
            for (let value of items) {
                this.club.push(value);
            }
            this.descriptionVisible = true;
            this.buttonTemplate = "buttonTemplate";
            this.setDataForService(this.club);
        });
        this.reservationSubscription = this.clubsService.reservations$.subscribe(reserv => {
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
    ngOnDestroy() {
        this.clubsDataSubscription.unsubscribe();
        this.reservationSubscription.unsubscribe();
        this.club = [];
    }
}
