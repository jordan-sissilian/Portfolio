// Recuperer des element
const loadingContainer = document.querySelector(".loading-container");
const websiteContent = document.querySelector(".websiteHome");

// Masquer la page de chargement après 2 secondes
// Afficher le site web
setTimeout(function () {
	loadingContainer.remove();
	websiteContent.style.display = "block";
}, 2000);

//afficher la navbar
setTimeout(function () {
	document.querySelector("nav").style.transform = 'translateY(0)';
}, 2500);

//afficher le text
setTimeout(function () {
	document.querySelector(".main").classList.remove("floue");
}, 2500);

document.addEventListener("contextmenu", function (e) {
	e.preventDefault();
});