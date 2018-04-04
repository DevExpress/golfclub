import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ClubsComponent } from "./clubs/clubs.component";
import { InfoComponent } from "./info/info-club.component";


export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "clubs",
        component: ClubsComponent
    },
    {
        path: "info",
        component: InfoComponent
    }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
