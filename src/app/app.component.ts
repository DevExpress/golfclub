import { Component, ViewEncapsulation, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { DOCUMENT } from "@angular/common";
import { AdaptService } from "./adapt.service";

const IS_SSR = makeStateKey<any>('isServerSideRendering');

@Component({
    selector: "golf-club-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.less"],
    encapsulation: ViewEncapsulation.None,
    providers: [AdaptService]
})

export class AppComponent {
    adaptOptions: any;
    constructor(private adapt: AdaptService,
        @Inject(DOCUMENT) _document: any,
        private transferState: TransferState,
        @Inject(PLATFORM_ID) private platformId: any) {
        this.adapt.adapt$.subscribe(item => {
            this.adaptOptions = this.adapt.getOptionsForAdaptation(item);
        });
        this.adapt.setAdaptValue(_document.documentElement.clientWidth);

        if (isPlatformServer(this.platformId)) {
            this.transferState.set(IS_SSR, true);
        }
    }
}
