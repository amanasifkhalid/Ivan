var metronome = new Metronome();
var bpm = document.getElementById("BPM");
var bpm_label = document.getElementById("BPMLabel");
var counter_label = document.getElementById("counter");
var tonic_select = document.getElementById("tonicSelect");
var octave_select = document.getElementById("octaveSelect");
var trigger_btn = document.getElementById("triggerBtn");
bpm.value = metronome.bpm;

trigger_btn.addEventListener("click", function() {
	metronome.trigger();
	trigger_counter(metronome.is_running, tonic_select.value, octave_select.value);
	tonic_select.disabled = metronome.is_running;
	octave_select.disabled = metronome.is_running;
});

tonic_select.addEventListener("change", function() {
	var index = parseInt(tonic_select.selectedIndex);
	octave_select.getElementsByTagName("option")[3].disabled = !(index < 2 || index > 9);
	if (!(index < 2 || index > 9) && octave_select.value == "4") {
		octave_select.value = "3";
	}
});

function change_metronome() {
	metronome.bpm = bpm.value;
	bpm_label.innerHTML = bpm.value;
}

function change_BPM(change) {
	bpm.stepUp(change);
	change_metronome();
}

function reset() {
	metronome.stop();
	counter_label.innerHTML = 0;
}

const links = ["fgWHrYC4LEs?t=240", "rpss7GsCj7A", "zzJzhTqJASY", "h5puAf5jkLc", "hjPrHmDtVGg?t=13", "YQCtq-t0F8U", "qwURbkxB4SU", "sPQ5E4o9Ewk", "j2LYsNujdG0", "eo-_pHMENjQ", "nrUPtkL-6Nk", "yb_5mJlVHPc", "EDh8a-a6TSo", "Jx_tj6EJWOg", "r0JfH_lgDqc?t=400", "UXDVB-glRKw"];
function inspire() {
	var choice = Math.floor(Math.random() * links.length);
	window.open(`https://youtu.be/${links[choice]}`, "_blank");
}