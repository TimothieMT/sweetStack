import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numtoname' })

export class NumtonamePipe implements PipeTransform {
	transform(text: string): string {
		let newText = text;
		newText = newText.replace('1', 'one');
		newText = newText.replace('2', 'two');
		newText = newText.replace('3', 'three');
		return newText;
	}
}