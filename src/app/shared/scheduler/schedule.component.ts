import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ClubsService } from "../../clubs.service";
import { Subscription } from "rxjs/Subscription";
import { DxSchedulerComponent } from "devextreme-angular/ui/scheduler";

@Component({
    selector: "schedule",
    templateUrl: "schedule.component.html",
    styleUrls: ["schedule.component.less"]
})
export class ScheduleComponent implements OnDestroy {
    @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;
    @Input() searchingParams: any;
    @Input() adaptOptions: any;
    @Output() editBook = new EventEmitter<any>();
    data: any[] = [];
    schedulerData: any;
    schedulerResources: any;
    initScheduler = false;
    groups: any[] = [];
    subscription: Subscription;
    reservationSubscription: Subscription;
    currentDate: Date;
    constructor(private clubsServise: ClubsService) {
        let init = false;
        this.subscription = clubsServise.clubsData$.subscribe(items => {
            this.data = items;
            this.schedulerResources = this.clubsServise.getResources(this.data);
            if (this.data.length == 1)
                this.groups = [];
            else 
                this.groups = ["Id"];
        });
        this.reservationSubscription = this.clubsServise.reservations$.subscribe(reserv => {
            this.schedulerData = reserv;
            if (this.initScheduler) {
                this.scheduler.instance.repaint();
            }
            this.initScheduler = true;
        });
    }
    openBook(e: any) {
        e.cancel = true;
        if(e.appointmentData.isNew) {
            this.editBook.emit(e.appointmentData);
        }
    }
    ngOnDestroy() {
        this.data = [];
        this.initScheduler = false;
        this.subscription.unsubscribe();
        this.reservationSubscription.unsubscribe();
    }
    ngOnInit() {
        this.currentDate = new Date(this.searchingParams.startDate);
    }
}