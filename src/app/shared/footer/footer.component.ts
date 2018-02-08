import { Component } from "@angular/core";

@Component({
    selector: "footer-app",
    templateUrl: "footer.component.html",
    styleUrls: ["footer.component.less"]
})

export class FooterComponent {
    year = new Date().getFullYear();
}
