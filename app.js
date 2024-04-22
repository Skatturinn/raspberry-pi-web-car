// legacy imports fyrir Node 10 ARM V6 stuðningur
const os = require('os');
const express = require('express');
const { dirname, join } = require('path');
const { fileURLToPath } = require('url');
const session = require('express-session');
const bodyParse = require('body-parser');
const { error } = require('console');
// var gpio = require('rpi-gpio');
const GPIO = require('rpi-gpio').promise;
const pigpio = require('pigpio').Gpio;
// GPIO.destroy()
/**
 * TAKEN FROM RPI-GPIO NODEJS DOCUMENTATION
 * https://www.npmjs.com/package/rpi-gpio?activeTab=code
 */
const PINS = {
        // 1: 3.3v
        // 2: 5v
        '3':  2,
        // 4: 5v
        '5':  3,
        // 6: ground
        '7':  4,
        '8':  14,
        // 9: ground
        '10': 15,
        '11': 17,
        '12': 18,
        '13': 27,
        // 14: ground
        '15': 22,
        '16': 23,
        // 17: 3.3v
        '18': 24,
        '19': 10,
        // 20: ground
        '21': 9,
        '22': 25,
        '23': 11,
        '24': 8,
        // 25: ground
        '26': 7,
};
/**
 * Taken from 
 * https://ben.akrin.com/driving-a-28byj-48-stepper-motor-uln2003-driver-with-a-raspberry-pi/
 */
const step_sequence = [[1,0,0,1],
                 [1,0,0,0],
                 [1,1,0,0],
                 [0,1,0,0],
                 [0,1,1,0],
                 [0,0,1,0],
                 [0,0,1,1],
                 [0,0,0,1]]
// try:
//     i = 0
//     for i in range(step_count):
//         for pin in range(0, len(motor_pins)):
//             GPIO.output( motor_pins[pin], step_sequence[motor_step_counter][pin] )
//         if direction==True:
//             motor_step_counter = (motor_step_counter - 1) % 8
//         elif direction==False:
//             motor_step_counter = (motor_step_counter + 1) % 8
//         else: # defensive programming
//             print( "uh oh... direction should *always* be either True or False" )
//             cleanup()
//             exit( 1 )
//         time.sleep( step_sleep )
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const stepperPins = [7,11,13,15]

const servoPin = 22
const test = async () => {
	let i = 0
	for (const pin of stepperPins) {
		await GPIO.setup(pin, GPIO.DIR_OUT).catch(err => console.error(err))
	}
        while (true) {
        let n = 0;
	// const promises = [];
	while (n < 8) {
		stepperPins.forEach(async (stak,nr) => 
		{await GPIO.write(stak, !!step_sequence[n][nr]).catch(err => console.log(err))}
	)
		console.log(i,n)
		// n++
	}
		await sleep(2);
    // i++ 
}
}

const t = async () => {
	await GPIO.setup(7, GPIO.DIR_OUT).catch(err => console.error(err))
	await GPIO.write(6, true)
}

const testcc = async () => {
	const servo = new pigpio(4, {mode: pigpio.OUTPUT});
	let i = 1
	while (i) {
		servo.servoWrite(500);
		i++;
		console.log(i);
		// servo.
		// servo.servoWrite(2500);
	}
}

// testcc()

const test2 = async (hz) => {
	await GPIO.destroy()
	const on = 20/hz;
	const off = 20 - on;
    await sleep(100);
	let i = 1;
		await GPIO.setup(servoPin, GPIO.DIR_OUT).catch(err => console.error(err))
	while (i) {
			await GPIO.write(servoPin, true).catch(err => console.error(err))
			await sleep(on);
			await GPIO.write(servoPin, false).catch(err => console.error(err))
			// await GPIO.write(dcPins[1], true).catch(err => console.error(err))
			await sleep(off);
			// await GPIO.write(dcPins[1], false).catch(err => console.error(err))
	//		console.log(i)
			i++
		}
}

// test2(10)

const test3 = async () => {
	const motor = new pigpio(22,  {mode: pigpio.OUTPUT});
	let pulseWidth = 1000;
let increment = 100;
	setInterval(() => {
		motor.servoWrite(pulseWidth);
		console.log(increment);
		pulseWidth += increment;
		if (pulseWidth >= 2000) {
		  increment = -100;
		} else if (pulseWidth <= 1000) {
		  increment = 100;
		}
	  }, 1000);

	}

// test()
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

router.get('/', (req, res) => { // Nærð í síðu
        const title = 'Forsíða';
    res.status(200).render('index', {title});

});
router.post('/takki', (req, res) => { // sendir boð
	/**
	 * @param {string | undefined} til
	 * @param {undefined | string} ekki
	 * @returns {boolean}
	 */
	const {w, a, s ,d } = req.body
	// console.log(w,a,s,d)
	function check(til,ekki) {
		return typeof til !== 'undefined' && typeof ekki === 'undefined'
	}
		// TODO gera viðbrögð fyrir takka w,a,s,d
        // console.log(req.body.w,req.body.a,req.body.d,req.body.s);
		// Servo motor for propulsion
		if (check(w,s)) {
			
			// Snúa motor áfram
		} 
		if (check(s,w)) {
			// Snúa motor afturábak
		}
		// Stepper motor for turning
		if (check(a,d)) {
			// beygja til vinstri
		}
		if (check(d,a)) {
			// beygja til hægri
		}
		console.log(req.body)
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
		const networkInfo = os.networkInterfaces().wlan0 || os.networkInterfaces().eth0 || os.networkInterfaces().WiFi // athugar fyrir linux og windows
        console.info(`Server running at ${networkInfo ? 
			(
				Number.parseFloat(networkInfo[0].address) && networkInfo[0].address 
				|| Number.parseFloat(networkInfo[1].address) && networkInfo[1].address // skilar ip tölu af tölvu
			) 
			: 'https://localhost' }:${port}`);
});
