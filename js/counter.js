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

	if (listener.noteName == null) {

	} else if (notes == 0 && listener.noteName[0] == tonic[0] && listener.noteName.slice(-1) == tonic.slice(-1)) {
		++notes;
	} else if (notes == 1 && listener.noteName[0] == top_note[0] && listener.noteName.slice(-1) == top_note.slice(-1)) {
		++notes;
	} else if (notes == 2 && listener.noteName[0] == tonic[0] && listener.noteName.slice(-1) == tonic.slice(-1)) {
		notes = 0;
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

function trigger_counter(is_running, tonic_note, num_octaves) {
	if (is_running) {
		tonic = tonic_note;
		top_note = tonic.slice(0, tonic.length - 1) + (parseInt(tonic.slice(-1)) + parseInt(num_octaves));
		start_count();
	} else {
		stop_count();
	}
}