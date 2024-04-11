// legacy imports fyrir Node 10 ARM V6 stuðningur
const os = require('os');
const express = require('express');
const { dirname, join } = require('path');
const { fileURLToPath } = require('url');
const session = require('express-session');
const bodyParse = require('body-parser')

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

require('dotenv').config()
console.log(process.env)
const app = express();

app.use(express.json())
app.use(express.static('./public')) // gefur okkur aðgang að js og css fyrir síðu
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
        console.log('post/afram',req?.body);
        res.status(200).json();
});


app.use('/', router)

/** villu meðhöndlun */
app.use((err,req,res,next) => {
        console.error(err);
        const title = 'Villa kom up';
        res.status(500).render('error', { title });
});

app.listen(port, () => {
		const networkInfo = os.networkInterfaces()?.wlan0 || os.networkInterfaces()?.eth0 || os.networkInterfaces()?.WiFi // athugar fyrir linux og windows
        console.info(`Server running at ${networkInfo ? 
			(
				Number.parseFloat(networkInfo[0].address) && networkInfo[0].address 
				|| Number.parseFloat(networkInfo[1].address) && networkInfo[1].address // skilar ip tölu af tölvu
			) 
			: 'https://localhost' }:${port}`);
});


console.log('test')


