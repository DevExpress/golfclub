import { Component, ViewChild, Input, PLATFORM_ID, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "../../common.service";
import { DatePipe, isPlatformBrowser } from "@angular/common";
import { DxFormComponent } from "devextreme-angular/ui/form";

const USER_NAME_KEY = "golfClubUser";

@Component({
    selector: "header-app",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.less"],
    providers: [CommonService, DatePipe]
})

export class HeaderComponent {
    @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;
    @Input() adaptOptions: any;
    logTemplate: string;
    loginTitle: string;
    userName: string;
    loginData: any = {
        loginValue: "",
        passwordValue: ""
    };
    loginVisible: boolean;
    constructor(private router: Router,
        @Inject(PLATFORM_ID) platformId: any,
        private common: CommonService,
        private datePipe: DatePipe) {
        if(isPlatformBrowser(platformId)) {
            this.authorizationCheck();
        }
    }
    showWelcome() {
        let form = this.form.instance,
            valid: any = form.validate();
        if (valid.isValid) {
            this.common.setCookie(USER_NAME_KEY, form.option("formData").loginValue);
            this.loginVisible = !this.loginVisible;
            this.authorizationCheck();
        }
    }
    authorizationCheck() {
        this.userName = this.common.getCookie(USER_NAME_KEY);
        this.setTemplate(this.userName);
    }
    logOut() {
        this.common.deleteCookie(USER_NAME_KEY);
        this.loginVisible = !this.loginVisible;
        this.authorizationCheck();
    }
    setTemplate(value: string) {
        if (value) {
            this.loginTitle = "Authorized User";
            this.logTemplate = "logoutTemplate";
        } else {
            this.loginTitle = "Login Form";
            this.logTemplate = "loginTemplate";
        }
    }
    redirect() {
        this.router.navigateByUrl("/home");
    }
}
