import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ClubsService } from "../../clubs.service";
import { Subscription } from "rxjs";

@Component({
    selector: "schedule",
    templateUrl: "schedule.component.html",
    styleUrls: ["schedule.component.less"]
})
export class ScheduleComponent implements OnDestroy, OnInit {
    @Input() searchingParams: any;
    @Input() adaptOptions: any;
    @Output() editBook = new EventEmitter<any>();

    groups: any[];
    groupsHasValue = false;
    data: any[] = [];
    schedulerData: any = [];
    schedulerResources: any = [];
    subscription: Subscription;
    reservationSubscription: Subscription;
    currentDate: Date;
    constructor(private clubsServise: ClubsService) {
        this.subscription = clubsServise.clubsData$.subscribe(items => {
            this.data = items;
            this.schedulerResources = this.clubsServise.getResources(this.data);
        });
        this.reservationSubscription = this.clubsServise.reservations$.subscribe(reserv => {
            this.schedulerData = reserv;
        });
    }
    openBook(e: any) {
        e.cancel = true;
        if(e.appointmentData.isNew) {
            this.editBook.emit(e.appointmentData);
        }
    }
    optionChanged(e: any) {
        if(e.name === "resources") {
            this.setGroupValue();
            this.groupsHasValue = true;
        }
    }
    setGroupValue() {
        if (this.data.length === 1) {
            this.groups = [];
        } else {
            this.groups = ["Id"];
        }
    }
    ngOnDestroy() {
        this.data = [];
        this.subscription.unsubscribe();
        this.reservationSubscription.unsubscribe();
    }
    ngOnInit() {
        if(!this.groupsHasValue) {
            this.setGroupValue();
        }
        this.currentDate = new Date(this.searchingParams.startDate);
    }
}
