import express from 'express';
import cors from 'cors';
import * as model from './model.js';
import { IEditedJob, IAddedJob, IJob } from './interfaces.js';
import * as tools from './tools.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructionsHtml());
});

app.get('/jobs', (req: express.Request, res: express.Response) => {
	res.json(model.getJobs());
});

app.get('/todos', (req: express.Request, res: express.Response) => {
	res.json(model.getTodos());
});

app.get('/skillTotals', (req: express.Request, res: express.Response) => {
	res.json(model.getSkillTotals());
});

app.delete('/jobs/:id', async (req: express.Request, res: express.Response) => {
	const id = Number(req.params.id);
	const pin = req.body.pin;
	if (pin !== process.env.PIN) {
		res.status(401).send({
			error: true,
			statusIdCode: 'badPin',
			message: `Bad pin.`
		})
	} else {
		const deletedObject = await model.deleteJob(id);
		if (deletedObject === undefined) {
			res.status(409).send({
				error: true,
				statusIdCode: 'recordDoesNotExist',
				message: `job with id ${id} does not exist, deletion failed`
			})
		} else {
			res.status(200).json(deletedObject);
		}
	};

});

app.patch('/job', async (req: express.Request, res: express.Response) => {
	const editedJob: IEditedJob = req.body.job;
	const pin: string = req.body.pin;
	if (pin !== process.env.PIN) {
		res.status(401).send({
			error: true,
			statusIdCode: 'badPin',
			message: `Bad pin.`
		})
	} else {
		const job: IJob = await model.saveEditedJob(editedJob);
		if (job) {
			res.status(200).send('ok');
		} else {
			res.status(500).send('job did not save');
		}
	}
});

app.post('/job', async (req: express.Request, res: express.Response) => {
	const addedJob: IEditedJob = req.body.job;
	const pin: string = req.body.pin;
	if (pin !== process.env.PIN) {
		res.status(401).send({
			error: true,
			statusIdCode: 'badPin',
			message: `Bad pin.`
		});
	} else {
		const success = await model.saveAddedJob(addedJob);
		if (success) {
			res.status(200).send('ok');
		} else {
			res.status(500).send('job did not save');
		}
	}
});

app.post('/identify-as-admin', (req: express.Request, res: express.Response) => {
	const pin = req.body.pin;
	if (pin !== process.env.PIN) {
		res.status(401).send({
			error: true,
			statusIdCode: 'badPin',
			message: `Bad pin.`
		});
	} else {
		res.status(200).send('ok');
	}
});

// TODO: replace with vitest test
app.get('/test', (req: express.Request, res: express.Response) => {
	const nextId = tools.getNextId([
		{
			id: 1,
			name: "aaa"
		},
		{
			id: 22,
			name: "bbb"
		}
	])
	res.send(`next id is ${nextId}`);
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});