const express = require('express');
const ejs = require('ejs');
const mongodb = require('mongoose');
const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('views/dist'));

mongodb.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
 { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database Bağlandı!')
)

const portfolio = require('./models/portfolio');

app.listen(process.env.PORT || 3000, () => {
    console.log(`App başladı!`);

    app.get('/', (req, res) => {
        portfolio.find({}).then((portfol) => {
            res.status(200).render('home.ejs', { title : 'Anasayfa', portfol : portfol })
        })
    })

    app.get('/ekle', (req, res) => {
        res.status(200).render('ekle.ejs', { title: 'Portfolio Ekle' })
    })

    app.post('/ekle', (req, res) => {
        const port = new portfolio(req.body)
        port.save()
            .then(() => { res.redirect('/') })
            .catch(e => console.log(e))
    })
})