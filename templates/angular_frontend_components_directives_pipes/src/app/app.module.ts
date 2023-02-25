import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { InfoComponent } from './info/info.component';
import { NumtonamePipe } from '../shared/numtoname.pipe';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from './employee.service';

@NgModule({
  declarations: [
    AppComponent,
    InfoBoxComponent,
    TopMenuComponent,
    HomeComponent,
    EmployeesComponent,
    InfoComponent,
    NumtonamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
