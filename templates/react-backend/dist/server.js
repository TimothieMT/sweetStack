import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const url = '';
const options = {
    method: 'GET',
    url: url,
    headers: {
        'Accept-Encoding': 'application/json'
    }
};
const rawCoins = (await axios.request(options)).data;
const coins = [];
rawCoins.forEach((rawCoin) => {
    const coin = {
        image: '',
        name: '',
        current_price: 0,
        price_change_percentage_24h: 0
    };
    coins.push(coin);
});
app.get('/', (req, res) => {
    res.send('This is from express.js');
});
app.get('/crypto', (req, res) => {
    res.json(rawCoins);
});
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map