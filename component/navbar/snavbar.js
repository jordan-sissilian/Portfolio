export default function snavbar(form) {
	if (window.innerWidth < 768) {
		// Gestion du menu de navigation mobile
		const mobileNavToggle = form.getElementById("mobileNav");
		const paragraph = mobileNavToggle.querySelector("p");
		const nav = form.querySelector("nav");
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
		const navLinks = form.querySelectorAll("nav a");
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
		const navActive = form.getElementById("navActive");
		if (navActive.getAttribute("alt") === link)
			return;
		const links = link.charAt(0).toUpperCase() + link.slice(1);
		const sectionsComponent = {
			'Home': '<index-page></index-page>',
			'AboutMe': '<about-page></about-page>',
			'Project': '<project-page></project-page>',
			'Contact': '<contact-page></contact-page>'
		};
		const sectionChangeEvent = new CustomEvent('sectionChange', {
			bubbles: true,
			composed: true,
			detail: { section: links, content: sectionsComponent[links] },
		});
		form.dispatchEvent(sectionChangeEvent);
		const exAlt = navActive.getAttribute("alt");
		const exActiv = form.querySelector(`.${exAlt}`);
		exActiv.style.color = '';
		navActive.removeAttribute("id");
		const navHover = form.querySelector(`.${link}`);
		navHover.setAttribute("id", "navActive");
		navHover.style.color = 'white';
	}


	function ajout() {
		const navb = form.querySelector("nav");
		!(window.innerWidth < 768) && (navb.style.transform = 'translateY(0px)');
	};
	function enlev() {
		const navb = form.querySelector("nav");
		!(window.innerWidth < 768) && (navb.style.transform = 'translateY(-70px)');
	};
	// Gestion des liens de navigation dans le menu principal
	const navHome = form.querySelector(".home");
	navHome.addEventListener("click", function () {
		linkChoose("home");
		ajout();
	});
	const navAboutMe = form.querySelector(".aboutMe");
	navAboutMe.addEventListener("click", function () {
		linkChoose("aboutMe");
		enlev();
	});
	const navProject = form.querySelector(".project");
	navProject.addEventListener("click", function () {
		linkChoose("project");
		enlev();
	});
	const navContact = form.querySelector(".contact");
	navContact.addEventListener("click", function () {
		linkChoose("contact");
		ajout();
	});
};