var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
let recognition = null;

let listening = false;
let btnRec;

document.addEventListener('DOMContentLoaded', function() {
    btnRec = document.getElementById('btnRec');
    init_speech();
});

let init_speech = function(){
    recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = true;
    //recognition.maxAlternatives = 1;

    recognition.onspeechend = function() {
        recognition.stop();
        btnRec.setAttribute('src', '#mic');
    }

    recognition.onnomatch = function(event) {
        diagnostic.textContent = 'whaaaa?';
    }

    recognition.onerror = function(event) {
        diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    }

    recognition.onresult = function(event) {
        let t = event.results[0][0].transcript;
        let tWords = t.split(' ');
        //let last = event.results.length - 1;
        //let word = event.results[last][0].transcript;
        tWords.forEach((w)=>{
            make_it_rain(w);
        });
        //console.log(word + ', Confidence: ' + event.results[0][0].confidence);

    }
};

let make_it_rain = function(word){
    let radTemp = getRandomArbitrary(0.05, 0.25);
    let masTemp = getRandomArbitrary(1, 5);
    let a_word = document.createElement('a-text');
    let a_sph = document.createElement('a-sphere');
    a_word.setAttribute('value', word);
    a_word.setAttribute('color', 'white');
    a_word.setAttribute('position', '-.3 0 0');
    a_word.setAttribute('scale', '2 2 2');
    a_sph.setAttribute('dynamic-body', `shape:sphere`);
    a_sph.setAttribute('material', 'transparent:true');
    a_sph.setAttribute('opacity', '0.5');
    a_sph.setAttribute('position', `${getRandomArbitrary(2, 3)} ${getRandomArbitrary(2, 3)} ${getRandomArbitrary(-2, -4)}`);
    a_sph.setAttribute('radius', radTemp);
    a_sph.appendChild(a_word);
    document.querySelector('a-scene').appendChild(a_sph);
    document.querySelector('a-scene').systems['boundary-checker'].registerMe(a_sph);

};

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

//gets a random number in a range
let getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  }