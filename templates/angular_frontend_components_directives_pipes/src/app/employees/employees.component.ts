import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent {
	searchText: string = '';

	constructor(public employeeService: EmployeeService) {
	}
}
