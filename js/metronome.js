class Metronome {
	constructor(bpm=60) {
		this.bpm = bpm;
		this.context = null;
		this.interval_ID = null;
		this.look_ahead_freq = 25; // In milliseconds
		this.look_ahead_time = 0.1; // In seconds
		this.next_note_time = 0.0;
		this.is_running = false;
	}

	schedule_note(time) {
		const osc = this.context.createOscillator();
		const envelope = this.context.createGain();

		osc.frequency.value = 1000;
		envelope.gain.value = 1;
		envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
		envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
		osc.connect(envelope);
		envelope.connect(this.context.destination);

		osc.start(time);
		osc.stop(time + 0.03);

		this.next_note_time += (60.0 / this.bpm);
	}

	scheduler() {
		while (this.next_note_time < this.context.currentTime + this.look_ahead_time) {
			this.schedule_note(this.next_note_time);
		}
	}

	start() {
		if (this.is_running) {
			return;
		}

		if (this.context == null) {
			this.context = new (window.AudioContext || window.webkitAudioContext)();
		}

		this.is_running = true;
		this.next_note_time = this.context.currentTime + 0.05;
		this.interval_ID = setInterval(() => this.scheduler(), this.look_ahead_freq);
	}

	stop() {
		this.is_running = false;
		clearInterval(this.interval_ID);
	}

	trigger() {
		if (this.is_running) {
			this.stop();
		} else {
			this.start();
		}
	}
}