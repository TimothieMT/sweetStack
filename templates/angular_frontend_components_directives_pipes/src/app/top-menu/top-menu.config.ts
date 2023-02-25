import { Routes } from "@angular/router";
import { EmployeesComponent } from "../employees/employees.component";
import { HomeComponent } from "../home/home.component";
import { InfoComponent } from "../info/info.component";

export const routerConfig: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'info',
        component: InfoComponent
    },
    {
        path: 'courses',
        component: EmployeesComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];