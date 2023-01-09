import fs from 'fs';

const name = process.argv[2];

if (name === undefined) {
	console.log('SCRIPT: cp');
	console.log('NAME: create page');
	console.log('-------------------------');
	console.log('EXAMPLE: npm run cp Info');
	console.log('RESULT: creates page /scr/pages/PageInfo.tsx');
	process.exit();
} else {
	const content = `
export const Page${name} = () => {
	return (
		<div className="page page${name}">
			<p>This is the ${name} page.</p>
		</div>
	);
};
	`;
	(async () => {
		fs.writeFile(`./src/pages/Page${name}.tsx`, content.trim(), () => {});
	})();
}
