const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Bom Dia Chefe...");
    } else if (hour >= 12 && hour < 17) {
        speak("Boa Tarde Chefe...");
    } else {
        speak("Boa Noite Senhor...");
    }
}

window.addEventListener('load', () => {
    speak("Iniciando o JARVIS...");
    wishMe();
    disableRightClick();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Seu navegador não suporta a API de reconhecimento de fala. Por favor, use o Google Chrome ou outro navegador compatível.");
} else {
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener('click', () => {
        content.textContent = "Escutando...";
        recognition.start();
    });

    function takeCommand(message) {
        if (message.includes('Oi') || message.includes('Olá')) {
            speak("Olá senhor, em que posso ajudá-lo?");
        } else if (message.includes("abra o google")) {
            window.open("https://google.com", "_blank");
            speak("Abrindo o Google...");
        } else if (message.includes("abra o youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Abrindo o Youtube...");
        } else if (message.includes("abra o facebook")) {
            window.open("https://facebook.com", "_blank");
            speak("Abrindo o Facebook...");
        } else if (message.includes('o que é') || message.includes('quem é') || message.includes('what are')) {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "Isto é o que encontrei na internet sobre " + message;
            speak(finalText);
        } else if (message.includes('wikipedia')) {
            window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
            const finalText = "Isto é o que encontrei na Wikipedia sobre " + message;
            speak(finalText);
        } else if (message.includes('hora')) {
            const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            const finalText = "A hora atual é " + time;
            speak(finalText);
        } else if (message.includes('data')) {
            const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
            const finalText = "A data de hoje é " + date;
            speak(finalText);
        } else if (message.includes('calculadora')) {
            window.open('Calculator:///');
            const finalText = "Abrindo Calculadora";
            speak(finalText);
        } else {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "Encontrei algumas informações para " + message + " no Google";
            speak(finalText);
        }
    }
}

// Função para desabilitar o clique direito do mouse
function disableRightClick() {
    document.addEventListener('contextmenu', event => event.preventDefault());
}
