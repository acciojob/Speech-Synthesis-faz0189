// Select DOM elements
const msg = new SpeechSynthesisUtterance();
const voicesDropdown = document.querySelector('#voices');
const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');
const textArea = document.querySelector('[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Populate voices list
function populateVoices() {
    const voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`) 
        .join('');
}

// Set voice selection
function setVoice() {
    msg.voice = speechSynthesis.getVoices().find(voice => voice.name === voicesDropdown.value);
}

// Speak the text
function speak() {
    msg.text = textArea.value;
    msg.rate = rate.value;
    msg.pitch = pitch.value;
    speechSynthesis.speak(msg);
}

// Stop speech
function stop() {
    speechSynthesis.cancel();
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);
rate.addEventListener('change', () => (msg.rate = rate.value));
pitch.addEventListener('change', () => (msg.pitch = pitch.value));
