var metronome = new Metronome();
var bpm = document.getElementById("BPM");
var bpm_label = document.getElementById("BPMLabel");
var counter_label = document.getElementById("counter");
var count_check = document.getElementById("countReps");
var tonic_select = document.getElementById("tonicSelect");
var octave_select = document.getElementById("octaveSelect");
var instrument_select = document.getElementById("instrumentSelect");
var play_check = document.getElementById("playPauseCheck");
var curr_note = document.getElementById("currNote");
var notify_IOS = false;
bpm.value = metronome.bpm;

function reset_choices() {
	count_check.checked = true;
	play_check.checked = true;
	tonic_select.value = "A";
	octave_select.value = "3";
	instrument_select.value = "0";
}

function disable() {
	count_check.disabled = metronome.is_running;
	tonic_select.disabled = metronome.is_running;
	octave_select.disabled = metronome.is_running;
	instrument_select.disabled = metronome.is_running;
}

count_check.addEventListener("change", function() {
	tonic_select.disabled = !count_check.checked;
	octave_select.disabled = !count_check.checked;
	instrument_select.disabled = !count_check.checked;
});

function warn_IOS() {
	if (notify_IOS) {
		return;
	}

	if ([
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
		alert("Hello, iOS user!\nUnfortunately, microphone support on iOS devices isn't up to snuff yet. Rep counting works best on desktop in Chrome/Firefox; sorry for the inconvenience!")
	}

	notify_IOS = true;
}

play_check.addEventListener("change", function() {
	metronome.trigger();
	if (count_check.checked) {
		warn_IOS();
		trigger_counter(metronome.is_running, tonic_select.value, octave_select.value, instrument_select.value);
	}

	disable();
});

if ("wakeLock" in navigator) {
	let wake_lock = null;
	const request = async () => {
		try {
			wake_lock = await navigator.wakeLock.request("screen");
		} catch (err) {}
	}

	play_check.addEventListener("change", () => {
		if (metronome.is_running) {
			request();
		} else {
			wake_lock.release().then(() => {wake_lock = null;});
		}
	});

	const vis_change = () => {
		if (wake_lock != null && document.visibilityState == "visible") {
			request();
		}
	}

	document.addEventListener("visibilitychange", vis_change);
}

function check_octave() {
	var index = parseInt(tonic_select.selectedIndex);
	var condition = false;
	if (instrument_select.value == "0") {
		condition = !(index < 2 || index > 9);
	} else if (instrument_select.value == "1") {
		condition = index == 2;
	}

	octave_select.getElementsByTagName("option")[3].disabled = condition;
	if (condition && octave_select.value == "4") {
		octave_select.value = "3";
	}

	var notes = tonic_select.getElementsByTagName("option");
	var disabled = instrument_select.value == 2;
	notes[3].disabled = disabled;
	notes[4].disabled = disabled;
	notes[5].disabled = disabled;
	notes[6].disabled = disabled;
	if (tonic_select.options[tonic_select.selectedIndex].disabled) {
		tonic_select.value = "A";
	}
}

tonic_select.addEventListener("change", check_octave);
instrument_select.addEventListener("change", check_octave);

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
	play_check.checked = true;
	counter_label.innerHTML = 0;
	disable();
}

const links = ["fgWHrYC4LEs?t=240", "rpss7GsCj7A", "zzJzhTqJASY", "h5puAf5jkLc", "hjPrHmDtVGg?t=13", "YQCtq-t0F8U", "qwURbkxB4SU", "sPQ5E4o9Ewk", "j2LYsNujdG0", "eo-_pHMENjQ", "nrUPtkL-6Nk", "yb_5mJlVHPc", "EDh8a-a6TSo", "Jx_tj6EJWOg", "r0JfH_lgDqc?t=400", "UXDVB-glRKw"];
function inspire() {
	var choice = Math.floor(Math.random() * links.length);
	window.open(`https://youtu.be/${links[choice]}`, "_blank");
}