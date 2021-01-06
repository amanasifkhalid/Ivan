var mic_input = new Wad({source: "mic"});
var listener = new Wad.Poly();
var notes = 0;
var tonic = null;
var top_note = null;
listener.setVolume(0);
listener.add(mic_input);

function log_pitch() {
	if (!metronome.is_running) {
		return;
	}

	if (notes == 0 && listener.noteName == tonic) {
		++notes;
		console.log(notes);
	} else if (notes == 1 && listener.noteName == top_note) {
		++notes;
		console.log(notes);
	} else if (notes == 2 && listener.noteName == tonic) {
		notes = 0;
		console.log(notes);
		counter_label.innerHTML = parseInt(counter_label.innerHTML) + 1;
	}

	requestAnimationFrame(log_pitch);
}

function start_count() {
	mic_input.play();
	listener.updatePitch();
	log_pitch(tonic);
}

function stop_count() {
	listener.stopUpdatingPitch();
	mic_input.stop();
	notes = 0;
}

function trigger_counter(is_running, tonic_note) {
	if (is_running) {
		tonic = tonic_note;
		top_note = tonic.slice(0, tonic.length - 1) + (parseInt(tonic.slice(-1)) + 3);
		start_count();
	} else {
		stop_count();
	}
}