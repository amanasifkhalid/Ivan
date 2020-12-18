var metronome = new Metronome();
var bpm = document.getElementById("BPM");
bpm.value = metronome.bpm;
bpm.addEventListener("change", function() {
	if (bpm.value >= 33 && bpm.value <= 200) {
		metronome.bpm = bpm.value;
	} else {
		metronome.bpm = 60;
	}
});

var trigger_btn = document.getElementById("triggerBtn");
trigger_btn.addEventListener("click", function() {
	metronome.trigger();
	if (trigger_btn.innerHTML === "Start") {
		trigger_btn.innerHTML = "Stop";
	} else {
		trigger_btn.innerHTML = "Start";
	}
});