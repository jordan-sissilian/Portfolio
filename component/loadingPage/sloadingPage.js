export default function loader(form) {
	// Recuperer des element
	const loadingContainer = form.querySelector(".loading-container");

	// Masquer la page de chargement après 2 secondes
	// Afficher le site web
	setTimeout(function () {
		loadingContainer.remove();
		form.querySelectorAll('.spanName').forEach(element => {
			element.style.color = 'cyan';
		});
	}, 2000);

	//afficher le text
	setTimeout(function () {
		document.querySelector(".main").classList.remove("floue");
	}, 2100);

	form.addEventListener("contextmenu", function (e) {
		e.preventDefault();
	});
};