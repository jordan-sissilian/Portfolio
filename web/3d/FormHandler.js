class FormHandler {
    constructor(clearTextFunction, drawText) {
        
        this.clearText = clearTextFunction;
        this.drawText = drawText;

        this.getInputQuestionIA = document.getElementById("inputQuestionIA");

        const form = document.getElementById('formPrompt');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const question = this.getInputQuestionIA.value;

            console.log('Question posée : ' + question);
            this.clearText();

            this.drawText(["Actuellement en cours de creation.",
                           "Je ne suis pas en mesure de repondre /a vos questions.",
                           "",
                           "Merci de votre comprehension!"]);
            //this.sendQuestion(question);
            this.getInputQuestionIA.value = "";
        });
    }

    async sendQuestion(question) {
        try {
            const response = await fetch('http://localhost:your_rust_server_port', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `question=${encodeURIComponent(question)}`
            });

            if (response.ok) {
                const data = await response.text();
                const responseArray = data.split(' ');
                this.receiveResponse(responseArray);
            } else {
                console.error('Erreur lors de la requête');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    receiveResponse(data) {
        this.clearText();
        console.log('Réponse reçue:', data);
        this.drawText(data);
    }
}

export default FormHandler;