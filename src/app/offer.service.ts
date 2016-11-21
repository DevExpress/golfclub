import { Injectable } from "@angular/core"
import odata from "devextreme/data/odata/store";

@Injectable()
export class OfferService {
    store: any = new odata({
        url: "https://js.devexpress.com/Demos/GolfClub/odata/Clubs/OfferOfTheDay",
        beforeSend: function (e: any) {
            e.method = "POST";
        }
    });
    getOffer() {
        return this.store.load();
    }
}