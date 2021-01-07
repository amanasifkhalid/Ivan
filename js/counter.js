var mic_input = null;
var listener = null;
var notes = 0;
var tonic = null;
var top_note = null;
var last_note = null;
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
var note_set = new Set();
var ideal_set = new Set();

function log_pitch() {
	if (!metronome.is_running) {
		return;
	}


	if (listener.noteName == null) {

	} else if (ideal_set.has(listener.noteName)) {
		note_set.add(listener.noteName);
		console.log(note_set);
	}

	if (notes == 0 && listener.noteName == tonic) {
		++notes;
	} else if (notes == 1 && listener.noteName == top_note) {
		if (last_note != null && parseInt(top_note.slice(-1)) - parseInt(last_note.slice(-1)) < 2) {
			++notes;
		} 
	} else if (notes == 2 && listener.noteName == tonic && note_set.size == ideal_set.size) {
		for (var note of ideal_set) {
			if (!note_set.has(note)) {
				return;
			}
		}

		notes = 0;
		note_set.clear();
		counter_label.innerHTML = parseInt(counter_label.innerHTML) + 1;
	}

	last_note = listener.noteName;
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
	note_set.clear();
	ideal_set.clear();
}

function trigger_counter(is_running, tonic_note, num_octaves, instrument) {
	if (is_running) {
		tonic = tonic_note + tonic_dict[tonic_note][instrument];
		top_note = tonic.slice(0, tonic.length - 1) + (parseInt(tonic.slice(-1)) + parseInt(num_octaves));
		for (let i = 0; i <= num_octaves; ++i) {
			ideal_set.add(tonic_note + (tonic_dict[tonic_note][instrument] + i));
		}
		start_count();
	} else {
		stop_count();
	}
}