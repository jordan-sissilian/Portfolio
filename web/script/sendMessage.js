class InputHandler {
  constructor(inputQuestionId, inputSubmitId) {
    this.inputQuestion = document.getElementById(inputQuestionId);
    this.inputSubmit = document.getElementById(inputSubmitId);
    
    this.blocage = false;

    this.inputQuestion.addEventListener("input", (event) => {
      this.handleInputEvent();
    });
    
    this.prompt = document.getElementById("prompt");
    this.prompt.addEventListener('blocage', (event) => {
      this.blocage = true;
      this.handleInputEvent();
      this.inputSubmit.disabled = true;
    });
    this.prompt.addEventListener('deBlocage', (event) => {
      this.blocage = false;
      this.handleInputEvent();
    });
  }

  handleInputEvent() {
    let currentButtonValue = this.inputSubmit.value;
    const newButtonValue =  !this.inputQuestion.value ? "❌" : !this.blocage ? "➡️" : "❌";

    if (currentButtonValue !== newButtonValue) {
      this.inputSubmit.style.opacity = 0;
      currentButtonValue = newButtonValue;

      setTimeout(() => {
        !this.blocage && (this.inputSubmit.disabled = newButtonValue === "❌");
        this.inputSubmit.value = newButtonValue;
        this.inputSubmit.style.opacity = 1;
      }, 250);
    }
  }
}

const inputHandler = new InputHandler("inputQuestionIA", "inputSubmit");