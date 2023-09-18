<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            background-color: #292931;
            height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .Denis {
            position: relative;
        }

        .DenisCorp {}

        .DenisBras {
            position: absolute;
            top: 25%;
            left: 21%;
            transform-origin: left center;
            animation: rotateBras 4s linear infinite;
        }

        @keyframes rotateBras {
            0% {
                transform: rotate(-60deg);
            }

            100% {
                transform: rotate(10deg);
            }
        }

        .compteRebour {
            font-size: 24px;
            color: white;
        }
    </style>
</head>

<body>
    <div class="Denis">
        <div class="DenisCorp">
            <img class="imgDenisCorp" src="./asset/img/1.png"></img>
        </div>
        <div class="DenisBras">
            <img class="imgDenisBras" src="./asset/img/2.png"></img>
        </div>
        <div class="compteRebour">
        </div>
    </div>

    <script>
        // Fonction pour mettre à jour le compte à rebours
        function updateCountdown() {
            const compteRebour = document.querySelector(".compteRebour");
            const now = new Date();
            const targetDate = new Date("2023-10-01T08:30:00");
            const timeDifference = targetDate - now;

            if (timeDifference <= 0) {
                compteRebour.textContent = "Le compte à rebours est terminé !";
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                compteRebour.textContent = `Compte à rebours : ${days}j ${hours}h ${minutes}m ${seconds}s`;
            }
        }

        // Mettre à jour le compte à rebours toutes les secondes
        setInterval(updateCountdown, 1000);

        // Appel initial pour afficher le compte à rebours
        updateCountdown();
    </script>
</body>

</html>
