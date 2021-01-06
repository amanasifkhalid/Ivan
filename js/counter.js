var mic_input = null;
var listener = null;
var notes = 0;
var tonic = null;
var top_note = null;
var tonic_dict = {
	"A": [3, 3, 2],
	"A#": [3, 3, 2],
	"B": [3, 3, 2],
	"C": [4, 3, 2],
	"C#": [4, 3, 2],
	"D": [4, 3, 2],
	"D#": [4, 3, 2],
	"E": [4, 3, 2],
	"F": [4, 3, 2],
	"F#": [4, 3, 2],
	"G": [3, 3, 2],
	"G#": [2, 3, 2]
};

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
	if (listener == null) {
		mic_input = new Wad({source: "mic"});
		listener = new Wad.Poly();
		listener.setVolume(0);
		listener.add(mic_input);
	}

	mic_input.play();
	listener.updatePitch();
	log_pitch(tonic);
}

function stop_count() {
	listener.stopUpdatingPitch();
	mic_input.stop();
	notes = 0;
}

function trigger_counter(is_running, tonic_note, num_octaves, instrument) {
	if (is_running) {
		tonic = tonic_note + tonic_dict[tonic_note][instrument];
		top_note = tonic.slice(0, tonic.length - 1) + (parseInt(tonic.slice(-1)) + parseInt(num_octaves));
		start_count();
	} else {
		stop_count();
	}
}