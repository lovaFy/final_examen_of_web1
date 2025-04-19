let startTime = null;
let previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");
const languageSelect = document.getElementById("language");


const words = {
    easy: {
        en: ["apple", "banana", "grape", "orange", "cherry"],
        fr: ["pomme", "banane", "raisin", "orange", "cerise"],
        es: ["manzana", "plátano", "uva", "naranja", "cereza"],
        de: ["apfel", "banane", "traube", "orange", "kirsche"],
        it: ["mela", "banana", "uva", "arancia", "ciliegia"]
    },
    medium: {
        en: ["keyboard", "monitor", "printer", "charger", "battery"],
        fr: ["clavier", "écran", "imprimante", "chargeur", "batterie"],
        es: ["teclado", "monitor", "impresora", "cargador", "batería"],
        de: ["tastatur", "bildschirm", "drucker", "ladegerät", "batterie"],
        it: ["tastiera", "monitor", "stampante", "caricatore", "batteria"]
    },
    hard: {
        en: ["synchronize", "complicated", "development", "extravagant", "misconception"],
        fr: ["synchroniser", "compliqué", "développement", "extravagant", "idée fausse"],
        es: ["sincronizar", "complicado", "desarrollo", "extravagante", "malentendido"],
        de: ["synchronisieren", "kompliziert", "entwicklung", "extravagant", "missverständnis"],
        it: ["sincronizzare", "complicato", "sviluppo", "stravagante", "malinteso"]
    }
};


function getRandomWord(mode) {
    const lang = languageSelect.value;
    const wordList = words[mode][lang];
    return wordList[Math.floor(Math.random() * wordList.length)];
}
languageSelect.addEventListener("change", () => startTest());

document.getElementById("theme").addEventListener("change", (e) => {
    const theme = e.target.value;
    if (theme === "theme1") {
        document.body.style.backgroundImage = "url('photos/vanil.png')";
    } else if (theme === "theme2") {
        document.body.style.backgroundImage = "url('photos/inav.png')";
    } else if (theme === "theme3") {
        document.body.style.backgroundImage = "url('photos/linav.png')";
    } else if (theme === "theme4") {
        document.body.style.backgroundImage = "url('photos/nav.png')";
    } else if (theme === "theme5") {
        document.body.style.backgroundImage = "url('photos/v.png')";
    } else if (theme === "theme6") {
        document.body.style.backgroundImage = "url('photos/va.png')";
    } else if (theme === "theme7") {
        document.body.style.backgroundImage = "url('photos/van.png')";
    } else if (theme === "theme8") {
        document.body.style.backgroundImage = "url('photos/login.png')";
    } else if (theme === "theme9") {
        document.body.style.backgroundImage = "url('photos/vanill.png')";
    } else if (theme === "theme10") {
        document.body.style.backgroundImage = "url('photos/vanilla.png')";
    } else if (theme === "theme11") {
        document.body.style.backgroundImage = "url('photos/Capture d_écran 2025-04-16 212327.png')";
    }
});

function startTest(wordCount = 50) {
    wordsToType.length = 0;
    wordDisplay.innerHTML = "";
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;
    inputField.disabled = false;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        wordDisplay.appendChild(span);
    });


    if (wordDisplay.children.length > 0) {
        wordDisplay.children[0].classList.add("highlight");
    }

    inputField.value = "";
    results.textContent = "";
}


function startTimer() {
    if (!startTime) {
        startTime = Date.now();
    }
}


function getCurrentStats() {
    const elapsedTime = (Date.now() - previousEndTime) / 1000;
    const wpm = (wordsToType[currentWordIndex].length / 5) / (elapsedTime / 60);

    const userInput = inputField.value.trim();
    const expectedWord = wordsToType[currentWordIndex];
    let correctChars = 0;

    for (let i = 0; i < Math.min(userInput.length, expectedWord.length); i++) {
        if (userInput[i] === expectedWord[i]) {
            correctChars++;
        }
    }

    const totalChars = expectedWord.length;
    const accuracy = (correctChars / totalChars) * 100;

    return {
        wpm: wpm.toFixed(2),
        accuracy: accuracy.toFixed(2)
    };
}


function updateWord(event) {
    if (event.key === " ") {
        const userInput = inputField.value.trim();
        const currentWord = wordsToType[currentWordIndex];

        
        if (userInput === currentWord) {
            if (!previousEndTime) previousEndTime = startTime;

            const { wpm, accuracy } = getCurrentStats();
            results.textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;

            currentWordIndex++;
            previousEndTime = Date.now();
            highlightNextWord();
            inputField.value = "";
        }

        event.preventDefault(); 

        
        if (currentWordIndex >= wordsToType.length) {
            endTest();
        }
    }
}

function highlightNextWord() {
    const wordElements = wordDisplay.children;

    if (currentWordIndex > 0) {
        wordElements[currentWordIndex - 1]?.classList.remove("highlight");
    }

    if (currentWordIndex < wordElements.length) {
        wordElements[currentWordIndex]?.classList.add("highlight");
    }
}

function endTest() {
    inputField.disabled = true;
    const totalTime = (Date.now() - startTime) / 1000 / 60; 
    const totalWords = wordsToType.length;
    const finalWPM = +(totalWords / totalTime).toFixed(2);

    results.textContent += `\n🎉 Test terminé ! Vitesse finale : ${finalWPM} WPM`;
}

inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
});

document.getElementById("restart-btn").addEventListener("click", () => {
    startTest(); 
});

document.getElementById("exit-btn").addEventListener("click", () => {
    window.location.href = "accueil.html";
});


modeSelect.addEventListener("change", () => startTest());
startTest();
