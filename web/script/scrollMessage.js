class scrollMsg {
    constructor() {
        this.scrollMessage = document.getElementById("scrollMessage");
        this.haut = document.getElementById("haut");
        this.bas = document.getElementById("bas");

        this.scrollMessage.addEventListener("click", (event) => {
            this.desactiveClick();
        });
        this.haut.addEventListener("click", (event) => {
            !this.blocage && this.clickHaut();
        });
        this.bas.addEventListener("click", (event) => {
            !this.blocage && this.clickBas();
        });

        this.blocage = false;

        this.transition = (value) => {
            !this.blocage && ((this.haut.disabled = value === true) && (this.bas.disabled = value === true));
            const opacity = !this.blocage ? 1 : 0.3;
            this.haut.style.opacity = opacity;
            this.bas.style.opacity = opacity;
        };

        this.click = (select) => {
            select ? this.haut.style.opacity = 0 : this.bas.style.opacity = 0;

            setTimeout(() => {
                select ? this.haut.style.opacity = 1 : this.bas.style.opacity = 1;
            }, 250);
        }

        this.prompt = document.getElementById("prompt");
        this.prompt.addEventListener('blocage', (event) => {
            this.blocage = true;
            this.transition(1);
        });
        this.prompt.addEventListener('deBlocage', (event) => {
            this.blocage = false;
            this.transition(0);
            this.desactiveClick();
        });

        this.totalMsg = 0;
        this.compteur = 0;
        this.hautEvent = new Event('hautDeplacement');
        this.basEvent = new Event('basDeplacement');
        this.prompt.addEventListener('addMessage', () => {
            this.totalMsg++;
            this.compteur = this.totalMsg;
        });
        this.canClick = true;
    }

    desactiveClick() {
        if (!(this.totalMsg > this.compteur)) {
            this.haut.style.opacity = .3;
            this.haut.disabled = 1;
        }
        if (!(this.compteur > 1)) {
            this.bas.style.opacity = .3;
            this.bas.disabled = 1;
        }
    }

    clickHaut() {
        if (this.compteur > 1 && this.canClick) {
            this.click(1);
            this.prompt.dispatchEvent(this.hautEvent);
            this.compteur--;
            this.canClick = false;
            setTimeout(() => {
                this.canClick = true;
            }, 1000);
        }
    }

    clickBas() {
        if (this.totalMsg > this.compteur && this.canClick) {
            this.click(0);
            this.prompt.dispatchEvent(this.basEvent);
            this.compteur++;
            this.canClick = false;
            setTimeout(() => {
                this.canClick = true;
            }, 1000);
        }
    }
}

const scrollMessages = new scrollMsg();
