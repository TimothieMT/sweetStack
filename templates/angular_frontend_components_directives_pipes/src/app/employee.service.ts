import { Injectable } from '@angular/core';
import { IEmployee } from 'src/shared/interfaces';
import axios from 'axios';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {

	employees: IEmployee[] = [];

	getEmployees() {
		return this.employees;
	}

	constructor() {
		(async () => {
			const rawEmployees = (await axios.get('https://edwardtanguay.vercel.app/share/employees.json')).data;

			rawEmployees.forEach((rawEmployee: any) => {
				this.employees.push({
					firstName: rawEmployee.firstName,
					lastName: rawEmployee.lastName,
					notes: rawEmployee.notes,
					selected: false
				})
			})
		})();
	}

	getSelectedEmployeesList() {
		const selectedEmployees = this.employees.filter(m => m.selected);
		let prefix = '';
		if (selectedEmployees.length === 0) {
			prefix = '0 selected employees';
		} else if (selectedEmployees.length === 1) {
			prefix = '1 selected employee: ';
		} else {
			prefix = `${selectedEmployees.length} selected employees: `;
		}
		return `${prefix}${selectedEmployees.map(m => m.lastName).join(', ')}`;
	}

	employeeHasSearchText(emp: IEmployee, searchText: string): boolean {
		const bulkText = emp.firstName + '|' + emp.lastName + '|' + emp.notes;
		return bulkText.toLowerCase().includes(searchText.toLowerCase());
	}
}
