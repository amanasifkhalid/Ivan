var metronome = new Metronome();
var bpm = document.getElementById("BPM");
var bpm_label = document.getElementById("BPMLabel");
var counter = document.getElementById("counter");
bpm.value = metronome.bpm;

var trigger_btn = document.getElementById("triggerBtn");
trigger_btn.addEventListener("click", function() {
	metronome.trigger();
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
	counter.innerHTML = 0;
	metronome.stop();
}

const links = ["fgWHrYC4LEs?t=240", "rpss7GsCj7A", "zzJzhTqJASY", "h5puAf5jkLc", "hjPrHmDtVGg?t=13", "YQCtq-t0F8U", "qwURbkxB4SU", "sPQ5E4o9Ewk", "j2LYsNujdG0", "eo-_pHMENjQ", "nrUPtkL-6Nk", "yb_5mJlVHPc", "EDh8a-a6TSo", "Jx_tj6EJWOg", "r0JfH_lgDqc?t=400", "UXDVB-glRKw"];
function inspire() {
	var choice = Math.floor(Math.random() * links.length);
	window.open(`https://youtu.be/${links[choice]}`, "_blank");
}