import { Injectable, Inject, HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Subject } from "rxjs";

@Injectable()
export class AdaptService {
    constructor(@Inject(DOCUMENT) private _document: any,) {
    }
    private adapt = new Subject<any>();
    adapt$ = this.adapt.asObservable();
    smallSize: any = {
        largeScreen: false,
        showTitle: false,
        searchLabelLocation: "left",
        heightBookPopup: 407,
        pickerType: "",
        heightLoginPopup: 335,
        views: ["agenda"],
        currentView: "agenda",
        position: {
            offset: "0 0",
            of: ""
        }
    };
    largeSize: any = {
        largeScreen: true,
        showTitle: true,
        searchLabelLocation: "top",
        heightBookPopup: 440,
        pickerType: "",
        heightLoginPopup: 325,
        views: ["day", "week", "workWeek"],
        currentView: "week",
        position: {
            offset: "-116 195",
            of: ".change-search-btn"
        }
    };
    setAdaptValue() {
        let width = this._document.documentElement.clientWidth;
        if (width < 768) {
            this.adapt.next(true);
        } else {
            this.adapt.next(false);
        }
    }
    getOptionsForAdaptation(value: boolean) {
        if (value) {
            return this.smallSize;
        } else {
            return this.largeSize;
        }
    }
}
