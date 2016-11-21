import { Component, ViewChild, Output, Input, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { DxFormComponent } from "devextreme-angular/ui/form";
import { CitiesService } from "../../cities.service";
import { CommonService } from "../../common.service";

const MAX_NUMBER_OF_DAYS_FOR_BOOKING = 7,
    MAX_NUMBER_OF_DAYS = 60,
    DEFAULT_COUNT_PLAYERS = 2,
    DEFAULT_COUNT_HOLES = 18;

@Component({
    selector: "search-panel",
    templateUrl: "search-panel.component.html",
    styleUrls: ["search-panel.component.less"],
    providers: [CitiesService, CommonService, DatePipe]
})

export class SearchPanelComponent {
    @ViewChild(DxFormComponent) form: DxFormComponent;
    @Output() onSearched = new EventEmitter<boolean>();
    @Input() data: any;
    @Input() adaptOptions: any;
    citiesList: any[];
    numberOfPlayers: number[] = [2, 3, 4];
    numberOfHoles: number[] = [9, 18];
    minStartDate: Date = new Date();
    maxStartDate: Date;
    minEndDate: Date = new Date();
    maxEndDate: Date;
    constructor(private citiesService: CitiesService,
        private commonService: CommonService,
        private router: Router,
        private datePipe: DatePipe) {
        let that = this,
            cities = this.citiesService.getCities();
        cities.done(function (data: any) {
            that.citiesList = data;
        });
        this.maxStartDate = this.commonService.addDays(new Date, MAX_NUMBER_OF_DAYS);
    }
    fieldChanged(e: any) {
        if (e.dataField == "startDate") {
            let value = e.value;
            this.minEndDate = value;
            this.maxEndDate = this.commonService.addDays(value, MAX_NUMBER_OF_DAYS_FOR_BOOKING);
            if ((!this.data.endDate) || (this.data.endDate <= this.data.startDate) || (this.data.endDate > this.commonService.addDays(value, MAX_NUMBER_OF_DAYS_FOR_BOOKING))) {
                this.data.endDate = this.maxEndDate;
            }
            if (!this.data.players) {
                this.data.players = DEFAULT_COUNT_PLAYERS;
            }
            if (!this.data.holes) {
                this.data.holes = DEFAULT_COUNT_HOLES;
            }
        }
    }
    getScreen() {
        let width = window.innerWidth;
        if (width < 768)
            return "xs";
        else
            return "lg";
    }
    searchClubs() {
        let data = this.data;
        data.endDate = this.commonService.getFormatDate(this.data.endDate);
        data.startDate = this.commonService.getFormatDate(this.data.startDate);
        if (!data.clubId)
           delete data.clubId;
        let result: any = this.form.instance.validate();
        if (result.isValid) {
            this.onSearched.emit(false);
            this.router.navigate(["clubs", data]);
        }
    }
}