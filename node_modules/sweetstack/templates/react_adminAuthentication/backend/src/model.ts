import fs from 'fs';

const welcomeMessagePathAndFileName = './src/data/welcomeMessage.txt';

export const getWelcomeMessage = () => {
	const welcomeMessage = fs.readFileSync(welcomeMessagePathAndFileName,
		{ encoding: 'utf8', flag: 'r' });
	return welcomeMessage;
}

export const saveWelcomeMessage = (welcomeMessage: string) => {
	fs.writeFileSync(welcomeMessagePathAndFileName, welcomeMessage);
}

export const getApiInstructions = () => {
	return `
<style>
	body {
		background-color: #444;
		padding: 1rem;
		color: #ccc;
		font-family: sans-serif;
	}
	code {
		background-color: #333;
	}
	a {
		color: orange;
	}
</style>
<h1>SQLite Site API</h1>
<ul>
	<li><a href="/test">/test</a> - shows date/time as test</li>
</ul>
	`;
}