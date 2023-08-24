if (window.innerWidth < 768) {
	// Gestion du menu de navigation mobile
	const mobileNavToggle = document.getElementById("mobileNav");
	const paragraph = mobileNavToggle.querySelector("p");
	const nav = document.querySelector("nav");
	mobileNavToggle.addEventListener("click", () => {
		// Gestion des transitions et des états du menu
		nav.classList.toggle("active");
		paragraph.style.opacity = "0";
		nav.style.opacity = "0";
		if (nav.classList.contains("active")) {
			setTimeout(() => {
				paragraph.textContent = "RETOUR";
				paragraph.style.opacity = "1";
				nav.style.opacity = "1";
			}, 100);
		} else {
			setTimeout(() => {
				nav.classList.remove("active");
				paragraph.textContent = "MENU";
				paragraph.style.opacity = "1";
				nav.style.opacity = "1";
			}, 100);
		}
	});
	// Gestion des liens de navigation dans le menu mobile
	const navLinks = document.querySelectorAll("nav a");
	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			// Animation de fermeture du menu après le clic sur un lien
			paragraph.style.opacity = "0";
			nav.style.opacity = "0";
			setTimeout(() => {
				nav.classList.remove("active");
				paragraph.textContent = "MENU";
				paragraph.style.opacity = "1";
				nav.style.opacity = "1";
			}, 100);
		});
	});
}

// Fonction pour gérer le choix de lien
function linkChoose(link) {
	const navActive = document.getElementById("navActive");
	if (navActive.getAttribute("alt") === link)
		return;
	// Mise à jour de la feuille de style
	const linkCss = `asset/css/page/${link}Style.css`;
	const styleLink = document.getElementById("styleL");
	styleLink.setAttribute("href", linkCss);
	// Affichage de la section correspondante et gestion de l'élément de navigation actif
	const links = link.charAt(0).toUpperCase() + link.slice(1);
	const sections = ['Home', 'AboutMe', 'Project', 'Contact'];
	sections.forEach(section => {
		const displayStyle = section === links ? 'block' : 'none';
		document.querySelector(`.website${section}`).style.display = displayStyle;
	});
	const exAlt = navActive.getAttribute("alt");
	const exActiv = document.querySelector(`.${exAlt}`);
	exActiv.style.color = '';
	navActive.removeAttribute("id");
	const navHover = document.querySelector(`.${link}`);
	navHover.setAttribute("id", "navActive");
	navHover.style.color = 'white';
}


function ajout() {
	const navb = document.querySelector("nav");
	if (!(window.innerWidth < 768))
		navb.style.transform = 'translateY(0px)';
	document.querySelector("html").style.backgroundImage = "url('/asset/img/fond.jpeg')";
	document.querySelector(".stars").style.display = "flex";
};
function enlev() {
	const navb = document.querySelector("nav");
	if (!(window.innerWidth < 768))
		navb.style.transform = 'translateY(-70px)';
	document.querySelector("html").style.backgroundImage = "";
	document.querySelector(".stars").style.display = "none";
};
// Gestion des liens de navigation dans le menu principal
const navHome = document.querySelector(".home");
navHome.addEventListener("click", function () {
	linkChoose("home");
	ajout();
});
const navAboutMe = document.querySelector(".aboutMe");
navAboutMe.addEventListener("click", function () {
	linkChoose("aboutMe");
	enlev();
});
const navProject = document.querySelector(".project");
navProject.addEventListener("click", function () {
	linkChoose("project");
	enlev();
});
const navContact = document.querySelector(".contact");
navContact.addEventListener("click", function () {
	linkChoose("contact");
	ajout();
});
