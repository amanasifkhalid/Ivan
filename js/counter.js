var mic_input = null;
var listener = null;
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
var check = 0;
var goal = [];

function log_pitch() {
	if (!metronome.is_running) {
		return;
	}

	if (listener.noteName == null) {

	} else if (listener.noteName == goal[check]) {
		++check;
	}

	if (check == goal.length) {
		check = 0;
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
	log_pitch();
}

function stop_count() {
	listener.stopUpdatingPitch();
	mic_input.stop();
	goal = [];
	check = 0;
}

function trigger_counter(is_running, tonic_note, num_octaves, instrument) {
	if (is_running) {
		let tonic = tonic_note + tonic_dict[tonic_note][instrument];
		let i;
		for (i = 0; i <= num_octaves; ++i) {
			goal.push(tonic_note + (tonic_dict[tonic_note][instrument] + i));
		}

		for (i = goal.length - 2; i >= 0; --i) {
			goal.push(tonic_note + (tonic_dict[tonic_note][instrument] + i));
		}
		start_count();
	} else {
		stop_count();
	}
}