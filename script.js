const button = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    button.textContent = "Light Mode";
}

button.addEventListener("click", () => {

    button.classList.add("animate");

    setTimeout(()  => {
        button.classList.remove("animate")
    }, 350);
    
    (document.body.classList.toggle("dark-mode"));

    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        button.textContent = "Dark Mode";
        localStorage.setItem("theme", "light")
    }


});

const titles = [
    "Student trying to learn stuff :-)",
    "It's pretty challanging",
    "But i'm trying my best"
];
const typingElement = document.getElementById("typing-text");

let titleIndex = 0;
let charIndex = 0;
let isDeleting = 0;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
        typingElement.textContent = currentTitle.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingElement.textContent = currentTitle.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

const clock = document.getElementById("clock");
const greetingElement = document.getElementById("greeting");

function updateClock() {
    const now = new Date();

    const date = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    let greetingMessage;

    const hour = now.getHours();

    if (hour < 12) {
        greetingMessage = "Good Morning";
    } else if (hour < 18) {
        greetingMessage = "Good Afternoon";
    } else {
        greetingMessage = "Good Evening";
    }

    greetingElement.textContent = greetingMessage;

    clock.innerHTML = `
        <div>${date}</div>
        <div>${time}</div>
    `;
}

updateClock();
setInterval(updateClock, 1000);    

const copyBtn = document.getElementById("copy-button");
const email = document.getElementById("email");

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(email.textContent);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 2000);
});

const message = document.getElementById("copy-message");


copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(email.textContent);

    message.textContent = "Copied to clipboard!";

    setTimeout(() => {
        message.textContent = "";
    }, 2000);
});

const facts = [
    "I was doing orienteering sports for nearly a decade.",
    "Before year 2026 i never tried any sort of energy drink.",
    "Once, when i was a kid, i fell off the 3-storey hight. I didnt break anything and felt absolutely normal. And afterwards i found out about the multiuniverse theory and a Schrödinger Cat.",
    "My hometown - Severodonetsk is 80% destroyed.",
    "It took me 1.5 years to learn German from 0 to the B2 level.",
    "I have never gone skiing",
    "I am in love with the most kind and a beautiful person in the world. ily, T :3",
    "Enough with the facts. I need to tell you something. YOU ARE DOING VERY WELL AND I AN VERY PROUD OF YOU!"
];

const factText = document.getElementById("fact-text");
const factBtn = document.getElementById("fact-button");

let lastIndex = -1;

factBtn.addEventListener("click", () => {

    let randomIndex;

    do {
        randomIndex = Math.floor(
            Math.random() * facts.length
        );
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;

    factText.textContent = facts[randomIndex];
});

const weatherText = document.getElementById("weather");
const weatherBtn = document.getElementById("weather-btn");

async function getWeather() {

    const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=47.37&longitude=8.54&current=temperature_2m"
    );

    const date = await response.json();

    weatherText.textContent  =
        `${date.current.temperature_2m}°C`;
}

getWeather();

weatherBtn.addEventListener("click", getWeather);


const colorPicker = document.getElementById("color-picker");

const savedColor = localStorage.getItem("accentColor");

if (savedColor) {
    document.documentElement.style.setProperty(
        "--accent-color",
        savedColor
    );

    colorPicker.value = savedColor;
}



colorPicker.addEventListener("input", () => {

    const color = colorPicker.value;

    document.documentElement.style.setProperty(
        "--accent-color",
        color
    );

    localStorage.setItem("accentColor", color);


});

const catImage = document.getElementById("cat-image");
const catBtn = document.getElementById("cat-btn");

async function getCat() {
    const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
    );

    const data = await response.json();

    catImage.src = data[0].url;
}

catBtn.addEventListener("click", getCat);
