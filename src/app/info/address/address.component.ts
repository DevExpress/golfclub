import { Component, OnDestroy, Output, EventEmitter } from "@angular/core";
import { ClubsService } from "../../clubs.service";
import { Subscription } from "rxjs";

@Component({
    selector: "full-address",
    templateUrl: "address.component.html",
    styleUrls: ["address.component.less"]
})
export class AddressComponent implements OnDestroy {
    @Output() dataLoaded = new EventEmitter<boolean>();
    dataInfo: any;
    subscription: Subscription;
    constructor(private clubsServise: ClubsService) {
        this.subscription = clubsServise.clubsData$.subscribe(items => {
            this.dataInfo = items;
            this.dataLoaded.emit(true);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
