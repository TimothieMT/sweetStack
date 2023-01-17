import MarkdownIt from 'markdown-it';

export const convertMarkdownToHtml = (markdown: string) => {
	const md = new MarkdownIt();
	return md.render(markdown);
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