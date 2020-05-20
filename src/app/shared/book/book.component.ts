import { Component, Input, ViewChild, OnDestroy, ViewEncapsulation } from "@angular/core";
import { DatePipe } from "@angular/common";
import { CommonService } from "../../common.service";
import { ClubsService } from "../../clubs.service";
import { DxFormComponent } from "devextreme-angular/ui/form";

const MIN_START_TIME = 6,
    MAX_END_TIME = 22,
    MAX_TIME_GAME = 2;

@Component({
    selector: "book",
    templateUrl: "book.component.html",
    styleUrls: ["book.component.less"],
    providers: [CommonService, DatePipe]
})

export class BookComponent {
    @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;
    @Input() data: any;
    @Input() bookVisible = false;
    @Input() adaptOptions: any;
    params: any;
    minStartDate: Date = new Date();
    reservations: any[] = [];
    bookData: any = {};
    clickBook = false;
    constructor(private commonService: CommonService, private clubsService: ClubsService) {
        this.clubsService.reservations$.subscribe(reserv => {
            this.reservations = reserv;
        });
        this.params = commonService.getParams();
    }
    dateChanged(e: any) {
        if (e.dataField === "startDate") {
            this.bookData.endDate = this.commonService.addTime(e.value, MAX_TIME_GAME);
            this.bookData.startDate = e.value;
        }
    }
    initBook() {
        if (this.data.isNew) {
            this.bookData = this.data;
        } else {
            let date = new Date(this.params.startDate);
            this.bookData.startDate = new Date(date.setHours(MIN_START_TIME, 0, 0, 0));
            this.bookData.endDate = this.commonService.addTime(this.bookData.startDate, MAX_TIME_GAME);
            this.bookData.players = this.params.players;
            this.bookData.notes = "";
        }
    }
    timeValidation = (data: any) => {
        if (this.clickBook) {
            let time = data.value.getHours();
            if (MIN_START_TIME > time || MAX_END_TIME < time) {
                data.rule.message = "This time is unavailable. Opening hours 06:00 AM - 10:00 PM";
                return false;
            } else {
                let result = this.validateBook();
                data.rule.message = "This time is booked";
                return !result;
            }
        } else {
            return true;
        }
    }
    validateBook() {
        let that = this;
        if (this.data.isNew) {
            this.reservations.splice(this.reservations.indexOf(this.data), 1);
        }
        return this.reservations.some(function (item) {
            if (item.Id === that.data.Id) {
                return (((item.startDate <= that.bookData.startDate) && (that.bookData.startDate < item.endDate))
                    || ((that.bookData.endDate > item.startDate) && (that.bookData.endDate <= item.endDate)));
            } else {
                return false;
            }
        });
    }
    booking() {
        let formInstance = this.form.instance,
            result: any;
        this.clickBook = true;
        result = formInstance.validate();
        if (result.isValid) {
            let data = formInstance.option("formData");
            this.reservations.push({
                isNew: true,
                Id: this.data.Id,
                Name: this.data.Name,
                startDate: this.bookData.startDate,
                endDate: this.bookData.endDate,
                players: this.bookData.players,
                notes: this.bookData.notes
            });
            this.clubsService.setReservation(this.reservations);
            this.bookVisible = !this.bookVisible;
        }
    }
    bookHidden() {
        this.bookData = {};
        this.clickBook = false;
    }
}
