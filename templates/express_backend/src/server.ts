import express from 'express';
import axios from 'axios';
import cors from 'cors'

const app = express()
app.use(cors())
const port = process.env.PORT || 3000;

//paste you own url ->
const url = 'URL';

const options = {
    method: 'GET',
    url: url,
    headers: {
        'Accept-Encoding': 'application/json'
    }
};
const database = (await axios.request(options)).data;

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('This is from express.js')
})

app.get('/database', (req: express.Request, res: express.Response) => {
    res.json(database)
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
});