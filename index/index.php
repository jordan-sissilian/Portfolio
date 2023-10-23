<!DOCTYPE html>
<html>

<head>
  <title>Jordan Sissilian</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="index.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js"></script>

  <script src="../3d/res/alphabetPixelTab.js"></script>
  <script>
    window.innerWidth <= 768 && (window.location.href = "../res/JORDAN_SISSILIAN_CV.pdf");
  </script>
</head>

<body>
  <div id="prompt">
    <form id="formPrompt">
      <input id="inputQuestionIA" type="text" placeholder="Poser une Question" required></input>
      <input id="inputSubmit" type="submit" value="❌" disabled></input>
    </form>
    <p id="infoPrompt">ℹ️</p>
  </div>
  <script src="../script/sendMessage.js"></script>

  <canvas id="IA"></canvas>
  <script type="module">
    import iaController from '../3d/iaController.js';

    const messageTest = [
      "Bonjour.",
      "Je suis une Intelligence Artificielle.",
      "Actuellement en cours de creation.",
      "Je ne suis pas en mesure de répondre  a vos questions.",
      "",
      "Merci pour votre comprehension."
    ];
    iaController.drawText(messageTest);
  </script>
</body>

</html>