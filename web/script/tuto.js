const infoPrompt = document.getElementById("infoPrompt");

const tutorialData = [
    { top: "10%", left: "20%", text: "Bienvenue dans le tutoriel interactif ✌🏼" },
    { top: "17%", left: "25%", text: "Rencontre notre IA 🤖, elle est là pour te guider et répondre à toutes tes questions. ❓" },
    { top: "50%", left: "2%", text: "📝 Cette zone de texte est l'endroit où tu poseras tes questions et recevras les réponses de l'IA." },
    { top: "75%", left: "40%", text: "Utilise le prompt 'Poser une question' pour interagir avec l'IA." },
    { top: "70%", left: "60%", text: "N'oublie pas de cliquer sur '➡️' pour soumettre ta question à l'IA. Le Boutton seras sur '❌' si aucune quesiton n'es poser. " },
    { top: "78%", left: "81%", text: "Tu peux également accéder à l'historique des réponses '⬆️⬇️'" },
    { top: "10%", left: "80%", text: "Prêt à commencer ? Pose ta première question et débloque de nouvelles catégories !! 🚀" }
];

let tutorialStep = -1;

const tutoriel = document.getElementById("tuto");
const content = tutoriel.querySelector("#content");

function changeStep() {
    tutorialStep++;
    if (tutorialStep >= tutorialData.length) {
        tutoriel.classList.remove("active");
        infoPrompt.style.display = "block";
        tutorialStep = -1;
    } else {
        tutoriel.classList.remove("active");
        setTimeout(() => {
            tutoriel.style.top = tutorialData[tutorialStep].top;
            tutoriel.style.left = tutorialData[tutorialStep].left;
            content.textContent = tutorialData[tutorialStep].text;
            tutoriel.classList.add("active");
        }, 500);
    }
}

infoPrompt.addEventListener('click', function (event) {
    tutoPassed = true;
    infoPrompt.style.display = "none";
    tutoriel.classList.add("active");
    changeStep();
});

tutoriel.addEventListener('click', function (event) {
    changeStep();
});