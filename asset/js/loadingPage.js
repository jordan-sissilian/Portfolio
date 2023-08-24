// Recuperer des element
const loadingContainer = document.querySelector(".loading-container");
const websiteContent = document.querySelector(".websiteHome");

// Masquer la page de chargement après 2 secondes
// Afficher le site web
setTimeout(function () {
	loadingContainer.remove();
	websiteContent.style.display = "block";
	document.querySelector('.stars').style.display = 'flex';
	document.querySelectorAll('.spanName').forEach(element => {
		element.style.color = 'cyan';
	});
}, 2000);

//afficher la navbar
setTimeout(function () {
	document.querySelector("nav").style.transform = 'translateY(0)';
}, 2500);

//afficher le text
setTimeout(function () {
	document.querySelector(".main").classList.remove("floue");
}, 2100);

document.addEventListener("contextmenu", function (e) {
	e.preventDefault();
});

setTimeout(function () {
	document.querySelector('html').style.backgroundImage = "url('/asset/img/fond.jpeg')";
}, 1700);