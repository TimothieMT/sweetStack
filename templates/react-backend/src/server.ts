import express from 'express';
import axios from 'axios';
import cors from 'cors'

const app = express()
app.use(cors())
const port = process.env.PORT || 3000;

type Coin = {
    image: string
    name: string
    current_price: number
    price_change_percentage_24h: number
}

const url = '';
const options = {
    method: 'GET',
    url: url,
    headers: {
        'Accept-Encoding': 'application/json'
    }
};
const rawCoins: any[] = (await axios.request(options)).data;

const coins: Coin[] = []

rawCoins.forEach((rawCoin: any) => {
    const coin: Coin = {
        image: '',
        name: '',
        current_price: 0,
        price_change_percentage_24h: 0
    }
    coins.push(coin)
})


app.get('/', (req: express.Request, res: express.Response) => {
    res.send('This is from express.js')
})

app.get('/crypto', (req: express.Request, res: express.Response) => {
    res.json(rawCoins)
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
});

