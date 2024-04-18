// Enum for rotating the server
const RotateServer = {
    RotateToLeft: 0,
    RotateToMiddle: 1,
    RotateToRight: 2
};

// Class for controlling an SG90 Motor
export class SG90MotorController {
    constructor(gpioPin = 22) {
        this._gpioPin = gpioPin;
        this._gpioController = null;
        this._motorPin = null;
        this._ticksPerMilliSecond = Math.floor(1000 / performance.now());

        this.gpioInitialized = false;

        // GPIO pin mapping for Raspberry Pi
        this.RaspberryGPIOpin = gpioPin;
    }

    // Initialize the GPIO pin
    async gpioInit() {
        try {
            this.gpioInitialized = false;
            this._gpioController = require('pigpio').Gpio;
            this._motorPin = new this._gpioController(this._gpioPin, { mode: this._gpioController.OUTPUT });
            this.gpioInitialized = true;
        } catch (error) {
            console.error("ERROR: GpioInit failed - " + error.toString());
        }
    }

    // Sends a pulse to the server motor
    pulseMotor(rotateServer) {
        const motorPulse = this.servoPulseTime(rotateServer); // Get motor pulse based on rotateServer
        this.sendPulse(motorPulse);
    }

    // Sends enough pulses to the server motor
    sendPulse(motorPulse) {
        // Total amount of time for a pulse
        const TotalPulseTime = 25;
        const timeToWait = TotalPulseTime - motorPulse;

        // Send the pulse to move the servo over a given time span
        this._motorPin.digitalWrite(1);
        this.millisecondToWait(motorPulse);
        this._motorPin.digitalWrite(0);
        this.millisecondToWait(timeToWait);
        this._motorPin.digitalWrite(0);
    }

    // Function to wait for a specific number of milliseconds
    millisecondToWait(millisecondsToWait) {
        const startTime = performance.now();
        while (performance.now() - startTime < millisecondsToWait) {
            // Do nothing, just wait
        }
    }

    // Retrieves the number of milliseconds to send as a pulse to turn the motor
    servoPulseTime(rotateServer) {
        switch (rotateServer) {
            case RotateServer.RotateToLeft:
                return 2;
            case RotateServer.RotateToMiddle:
                return 1.2;
            case RotateServer.RotateToRight:
                return 0.4;
            default:
                return -1;
        }
    }
}
