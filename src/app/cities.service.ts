import { Injectable } from "@angular/core";
import odata from "devextreme/data/odata/store";

@Injectable()
export class CitiesService {
    store: any = new odata({
        url: "https://js.devexpress.com/Demos/GolfClub/odata/Cities",
        key: "Id",
        keyType: "Int32"
    });
    getCities() {
        return this.store.load();
    }
}
