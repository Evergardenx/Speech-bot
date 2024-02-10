
let text = ""
let language = "en-US"
let voice = "Albert"
let speed = "0.5"
const synth = window.speechSynthesis;
let voices
let elSelected = false

const btnTxtToSpeech = document.querySelector(".btn-text-to-speech")
btnTxtToSpeech.addEventListener("click",textToSpeech)

function obtainListOfLanguages(){
    voices = synth.getVoices()
    let languagesVoices = []
    if(voices.length > 0) {
        for(let i= 0; i < voices.length;i++) {
            if(!languagesVoices.includes(voices[i].lang)) {
                languagesVoices.push(voices[i].lang)
                fillLanguageSettings(voices[i].lang)
            }
        }
    }
}
function obtainListOfVoicesLanguage() {

    voicesDefault = voices.filter(function(voice) {
        return voice.lang.startsWith('en-US') 
    })
    let i  = 0
    if(voicesDefault.length > 0) {
        voicesDefault.map(
            function (voice) {
                fillVoiceSettings(voice.name, i)
                i++
            }
        )
        return voicesDefault
    } else {
        voices.map(
            function (voice) {
                fillVoiceSettings(voice.name, i)
                i++
            }
        )
        return voices
    }
}

function captureData(){
    const textToSpeech = document.querySelector(".text-area")
    text = textToSpeech.value
    voice = listVoice.value
}

function textToSpeech() {
    captureData()
    speechSynthesis.cancel()
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed
    utterance.voice = voices[voice]
    speechSynthesis.speak(utterance);
}

synth.addEventListener("voiceschanged", populateVoiceList)

function populateVoiceList() {

    voices = synth.getVoices()
    obtainListOfLanguages()
    voices = obtainListOfVoicesLanguage()
}  

const listLanguage = document.getElementById("select-language")
console.log(listLanguage)
const listVoice = document.getElementById("select-voice")
//when clicking one language of list botain list of voices for the language 
listLanguage.addEventListener("change", listVoicesOfLanguage)

function listVoicesOfLanguage() {
    let selectedOptionText = listLanguage.options[listLanguage.selectedIndex].text
    console.log(selectedOptionText)
    console.log(voices)
    voices = synth.getVoices().filter(function(voice) {
        return voice.lang.startsWith(selectedOptionText)
    })    
    console.log(voices)
    let i  = 0
    listVoice.innerHTML = ""
    voices.map( 
        function(voice) {
            console.log(voice)
            fillVoiceSettings(voice.name, i)
            i++
        }
    )
}
listVoice.addEventListener("change",captureVoice )

function fillLanguageSettings(language) {
    language === 'en-US' ? 
       listLanguage.innerHTML += `<option selected  value="` + language + `">` + language +`</option>`
    : 
    listLanguage.innerHTML += `<option  value="` + language + `">` + language +`</option>`
}

function captureVoice() {
    const selectedIndex = listVoice.selectedIndex
    voice = selectedIndex
}

function fillVoiceSettings(voice, ind) {
    listVoice.innerHTML += `<option value="` + ind + `">` + voice +`</option>`
}

const btnsSpeed05x = document.getElementById("btn-speed-05x")
const btnsSpeed075x = document.getElementById("btn-speed-075x")
const btnsSpeed1x = document.getElementById("btn-speed-1x")
const btnsSpeed15x = document.getElementById("btn-speed-15x")

btnsSpeed05x.addEventListener("click", (e) => changeSpeed(e))
btnsSpeed075x.addEventListener("click", (e) => changeSpeed(e))
btnsSpeed1x.addEventListener("click", (e) => changeSpeed(e))
btnsSpeed15x.addEventListener("click", (e) => changeSpeed(e))


function changeSpeed(e) {
    console.log("hola?")
    const btnSelected = document.querySelector(".btn-speed-selected")
    btnSelected.classList.remove("btn-speed-selected")
    btnSelected.classList.add("btn-speed")  

    let el = e.currentTarget
    speed = el.getAttribute("value") 
    el.classList.remove("btn-speed")
    el.classList.add("btn-speed-selected")
}