const getInputQuestionIA = document.getElementById("inputQuestionIA");
const getInputSubmit = document.getElementById("inputSubmit");

let currentButtonValue = getInputSubmit.value;
getInputQuestionIA.addEventListener("input", (event) => {
    const newButtonValue = !getInputQuestionIA.value ? "❌" : "➡️";

    if (currentButtonValue !== newButtonValue) {
        getInputSubmit.style.opacity = 0;
        currentButtonValue = newButtonValue;

        setTimeout(() => {
            getInputSubmit.disabled = newButtonValue === "❌";
            getInputSubmit.value = newButtonValue;
            getInputSubmit.style.opacity = 1;
        }, 250);
    }
});