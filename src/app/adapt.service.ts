import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import devexpress  from "devextreme/core/devices"

@Injectable()
export class AdaptService {
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
    }
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
    }
    setAdaptValue() {
        let width = window.innerWidth;
        devexpress.current({ platform: "generic" });
        if (devexpress.real().generic) {
            this.largeSize.pickerType = "calendar";
            this.smallSize.pickerType = "calendar";
        } else {
            this.largeSize.pickerType = "rollers";
            this.smallSize.pickerType = "rollers";
        }
        if (width < 768)
            this.adapt.next(true);
        else
            this.adapt.next(false);
    }
    getOptionsForAdaptation(value: boolean) {
        if (value) {
            return this.smallSize;
        } else {
            return this.largeSize;
        }
    }
}