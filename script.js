import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopButton = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.stepper-decrease');
const addBeats = document.querySelector('.stepper-increase');
const measureCount = document.querySelector('.stepper-count');

const click1 = new Audio('click1.mp3');
const click2 = new Audio('click2.mp3');

// click1.onplay(() => console.log('playing click1'));


let bpm = 160;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = `Medium`; 

function updateMetronome () {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;

    metronome.timeInterval = 60000 / bpm;

    if (bpm <= 40) {
        tempoTextString = `Super Slow`;
    } else if (bpm > 40 && bpm < 80) {
        tempoTextString = `Slow`;
    } else if (bpm > 80 && bpm < 120) {
        tempoTextString = `Getting There`;
    } else if (bpm > 120 && bpm < 180) {
        tempoTextString = `Nice & Steady`;
    } else if (bpm > 180 && bpm < 220) {
        tempoTextString = `Rock & Roll`;
    } else if (bpm > 220 && bpm < 240) {
        tempoTextString = `Funky Stuff`;
    } else if (bpm > 240 && bpm < 260) {
        tempoTextString = `Relax Dude`;
    } else if (bpm > 260 && bpm < 300) {
        tempoTextString = `Eddie Van Halen!`;
    }


    tempoText.textContent = tempoTextString;
}


decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20){
        return;
    }
    bpm--;
    updateMetronome ()
})

increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 300){
        return;
    }
    bpm++;
    updateMetronome ()
})

tempoSlider.addEventListener('input', () =>{
    bpm = tempoSlider.value;
    updateMetronome ()
})

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 2){
        return;
    }
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
})

addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12){
        return;
    }
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
})

startStopButton.addEventListener('click', () => {
    count = 0;
    if (!isRunning){
        metronome.start();
        isRunning = true;
        startStopButton.textContent = `STOP`;
    } else {
        metronome.stop();
        isRunning = false;
        startStopButton.textContent = `START`;
    }
})


function playClick(){
    console.log(count);
    if (count === beatsPerMeasure){
        count = 0;
    }
    if (count === 0){
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate : true } );



