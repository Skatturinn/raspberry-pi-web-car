// legacy imports fyrir Node 10 ARM V6 stuðningur
const os = require('os');
const express = require('express');
const { dirname, join } = require('path');
const { fileURLToPath } = require('url');
const session = require('express-session');

require('dotenv').config() // dotenv v10 uppsetning á process.env

const {
        PORT: port = 3000,
        SESSION_SECRET: sessionSecret,
        DATABASE_URL: connectionString,
} = process.env
if (!connectionString || !sessionSecret) {
        const vantar = [];
        !connectionString && vantar.push('connectionString');
        !sessionSecret && vantar.push('sessionSecret');
        console.error(`Vantar ${vantar} í .env skrá í rót`);
        process.exit(1);
}

const app = express();

app.set('views', './views'); // ./views inniheldur ejs skrár fyrir byrtingu
app.set('view engine', 'ejs'); // ejs útfærlsa á html

app.use(
        session({
                secret: sessionSecret,
                resave: false,
                saveUninitialized: false
        })
);

// TODO setja upp passport
// notendastuðningur
// app.use(passport.initialize())
// app.use(passport.session())
// TODO stuðningur við villur
// app.locals = {isInvalid} skoða vef2-2022-v2 á skatturing github


/** Gerum router hér */
const router = express.Router();

router.get('/', (req, res) => {
        const title = 'Forsíða';
    res.status(200).render('index', {title});

});
router.post('/', (req, res) => {
        console.log('test')
        res.status(200).json('test')
});
router.post('/afram', (req, res) => {
        console.log(JSON.stringify(req.body));
        res.status(200).json(req.body);
});


app.use('/', router)

/** villu meðhöndlun */
app.use((err,req,res,next) => {
        console.error(err);
        const title = 'Villa kom up';
        res.status(500).render('error', { title });
});

app.listen(port, () => {
        console.info(`Server running at ${os.networkInterfaces().wlan0[0].address}:${port}`);
});


console.log('test')


