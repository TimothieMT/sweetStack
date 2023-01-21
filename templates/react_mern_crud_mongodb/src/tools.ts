

export const randomizeArray = (array: any[]) => {
	let currentIndex = array.length, randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
	return array;
}

export const sortArrayOfObjects = (objs: any, prop: string, order: string = 'asc') => {
	let compare1 = 1;
	let compare2 = -1;
	if (order === 'desc') {
		compare1 = -1;
		compare2 = 1;
	}
	return objs.slice(0).sort((a: any, b: any) => (a[prop] > b[prop]) ? compare1 : ((b[prop] > a[prop]) ? compare2 : 0))
}

export const capitalizeFirstLetter = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
}