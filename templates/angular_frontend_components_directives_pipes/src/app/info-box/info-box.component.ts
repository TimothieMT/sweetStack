import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-info-box',
	templateUrl: './info-box.component.html',
	styleUrls: ['./info-box.component.scss']
})

export class InfoBoxComponent {
	@Input() title = 'Info';
	@Input() body = '(Watch this space...)';
	@Input() status = '';
	@Input() highlight = '';

	color = '';
	showDevInfo = false;
	isHighlighted = false;
	buttonIsDisabled = true;

	handleDevInfoButtonClick = () => {
		this.showDevInfo = !this.showDevInfo;
		console.log(`button for info-box "${this.title}" clicked`);
	}

	ngOnInit() {
		this.color = this.status === 'danger' ? 'red' : 'green';
		this.isHighlighted = this.highlight === 'true';
	}



}
