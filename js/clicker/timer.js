export class CountDownTimer {

	constructor() {
		this._seconds = 0;
		this._stopped = true;
		this._delay = ms => setTimeout(() => {
				this._stopped = true;
				console.log('Flag is: ' + this._stopped);
		}, ms);
	}

	setUp(seconds) {
		this._seconds = seconds;
		return this;
	}

	async start() {
		console.log('timer started');
		this._stopped = false;
		console.log('Flag is: ' + this._stopped);
		console.log('Milliseconds: ' + this._seconds * 1000);
		const result = await this._delay(this._seconds * 1000);
	}

	isStopped() {
		return this._stopped;
	}

	isStillRun() {
		return !this._stopped;
	}

	getRemainedSeconds() {
		return this._seconds;
	}
}