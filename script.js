let audio, visual, context, analyser, src, array;

const elements = [];

const columnCount = 80;

visual = document.getElementById("visual");
audio = document.getElementById("audio");

window.onload = (() => {
    let columns = "";
    for (let i = 1; i <= columnCount; i++) {
        let item = document.createElement('div');
        item = `<div class="column" id="${i*10}"></div>`
        columns += item;
    }
    visual.innerHTML = columns;
    for (let i = 1; i <= columnCount; i++) {
        elements[i] = document.getElementById(i*10).style;
    }

} )

audio.addEventListener("playing", (() => {
    if(!context) {
        preparation();
    }
    loop();
}))


function preparation() {
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop() {
    if(!audio.paused) {
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    for (let i = 1; i <= columnCount; i++) {
        elements[i].height = (array[i*10])+"px";
    }
}