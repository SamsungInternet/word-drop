var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuos = true;

let listening = false;
let btnRec;

document.addEventListener('DOMContentLoaded', function() {
    btnRec = document.getElementById('btnRec');
    
});

//Speech recognition events
recognition.onresult = (event) => {
    let t = event.results[0][0].transcript;
    let tWords = t.split(' ');
    let posx = tWords.length*-.35; 
    tWords.forEach((w)=>{
        let pt = posx.toString() + ' ' + getRandomArbitrary(4, 5) + ' ' + getRandomArbitrary(-3, -5);
        posx = posx + .3;
        createWord(w, pt);
    });
    //console.log('processing: ' + tWords);
};

recognition.onspeechend = () => {
  recognition.stop();
  btnRec.setAttribute('src', '#mic');
};

recognition.onnomatch = (event) => {
 console.log("wha?");
};

recognition.onerror = (event) => {
  console.log(event.error);
};

//creates a mesh that serves as a container that interacts with physics on behalf of the text
let createWord = (word, pos) => {
    let radTemp = getRandomArbitrary(0.05, 0.25);
    let masTemp = getRandomArbitrary(1, 5);
    let scaleTemp = 0.1 + Math.random();
    let containerShape = document.createElement('a-sphere');
    containerShape.setAttribute('position', pos);
    containerShape.setAttribute('radius', radTemp);
    containerShape.setAttribute('material', 'transparent:true;opacity:0.0;mass:' + masTemp);
    containerShape.setAttribute('dynamic-body', '');
    containerShape.setAttribute('class', 'sceneWord');

    let containedText = document.createElement('a-entity');
    containedText.setAttribute('bmfont-text', 'text:'+word+';color:#FFFFFF');
    containedText.setAttribute('position', '0 0 0');
    containedText.setAttribute('scale', scaleTemp);

    containerShape.appendChild(containedText);
    document.querySelector('a-scene').appendChild(containerShape);
    document.querySelector('a-scene').systems['boundary-checker'].registerMe(containerShape);
};

//gets a random number in a range
let getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

//toggles the listen button in the GUI
let toggleListen = () => {
    if(listening){
        recognition.stop();
        btnRec.setAttribute('src', '#mic');
        listening = false;
    }
    else{
        btnRec.setAttribute('src', '#rec');
        recognition.start();
        listening = true;
        //console.log('listening....');
    }
}