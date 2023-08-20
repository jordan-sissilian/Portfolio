function couleurAleatoire() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
// Fonction pour gérer le clic sur le bouton "cercle"
function handleClick() {
	// Supprimer le bouton "cercle" existant
	document.querySelector('.cercle').remove();

	// Créer un nouveau bouton "cercle"
	const cercleButtonNew = document.createElement('button');
	cercleButtonNew.className = 'cercle';

	// Générer des coordonnées aléatoires pour le nouveau bouton "cercle"
	const randomNumberX = Math.floor(Math.random() * window.innerWidth);
	const randomNumberY = Math.floor(Math.random() * window.innerHeight);
	cercleButtonNew.style.top = randomNumberY + 'px';
	cercleButtonNew.style.left = randomNumberX + 'px';

	const couleurHex = couleurAleatoire();

	// Appliquer la couleur de fond et l'opacité au nouveau bouton "cercle"
	cercleButtonNew.style.backgroundColor = couleurHex;
	cercleButtonNew.style.opacity = 0.8;
	cercleButtonNew.onclick = handleClick;

	// Sélectionner l'élément "arrow"
	const arrow = document.querySelector('.arrow');

	// Appliquer des styles aux éléments du DOM
	document.querySelectorAll('.spanName').forEach(element => {
		element.style.color = couleurHex;
	});
	document.querySelector('.mouse-follower').style.backgroundColor = couleurHex;
	cercleButtonNew.addEventListener('mouseover', () => { arrow.style.display = 'none'; });
	cercleButtonNew.addEventListener('mouseout', () => { arrow.style.display = 'block'; });

	// Ajouter le nouveau bouton "cercle" au corps (body) du document
	document.body.appendChild(cercleButtonNew);
}

// Attendre 2000 millisecondes avant d'exécuter le code
setTimeout(() => {
	// Créer un élément pour suivre la position de la souris
	const mouseFollower = document.createElement('div');
	mouseFollower.className = 'mouse-follower';
	// Insérer une image dans l'élément
	mouseFollower.innerHTML = '<img class="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnElEQVR4nO3aP0hWURjA4ZOgOIjYIgiCg4ObDq0tQeDU6JijaxCKa2NQII2ttbU6VWtjjUFLEAhOSrgYDvKE9EGIYd+fe77v3HveB+5yxwv3nN89700phBBCCCFUDgfYx1KqEdZx2bs+YhtzqSZ447qz3r2HmEpdh2Wc+7cjPMda6jK88H+f8QSLqWuwgBP9ucAhtjCTugK7BvcTr3Efd1KbYQbfDe8bnmE1tRUeG93VlvoJO5hPbYIpfNGcX3iHR5hObYAH8jjGK9xLpcN7eX0tOsH9TeTcyk1wNxM5t7IS3O2JnFsZCa6/RM5tcglusETObTIJbrhEzm18CW70RM4tf4JrJpFzy5fgmk/k3JpPcPkSObdmEhyban0Aan8F/Gn1OhdBzOKHWrdB7Kk1hHAXp2pNYbys9mMIK73VtM7PYbyt9kAEG1UfieFDtYei8iVv+cfiah+MaCZ52zkaM3rytns4arjk7cZ43GDJ270fJPSXvN38RcbtyTv5JJ1A8p4Vk6RjTN7LIpN0TLO/p0UmaQghhBBCCKlpvwHrKcC8hKbUrQAAAABJRU5ErkJggg==" >';
	// Ajouter l'élément au corps (body) du document
	document.body.appendChild(mouseFollower);
	mouseFollower.style.left = '-50px';
	mouseFollower.style.top = '${window.innerHeight}px';

	// Fonction pour mettre à jour la position du suiveur de souris
	function updateMouseFollower(event) {
		const mouseX = event.pageX;
		const mouseY = event.pageY;
		const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollY = window.pageYOffset || document.documentElement.scrollTop;

		// Mettre à jour la position du suiveur de souris
		mouseFollower.style.left = `${mouseX + scrollX}px`;
		mouseFollower.style.top = `${mouseY + scrollY}px`;
		// Calculer l'angle de rotation pour le suiveur de souris
		const cercleButton = document.querySelector('.cercle');
		const posX = cercleButton.offsetLeft;
		const posY = cercleButton.offsetTop;
		const angle = Math.atan2(posY - mouseY, posX - mouseX);
		const angleDegrees = angle * (180 / Math.PI);
		// Appliquer la rotation au suiveur de souris
		mouseFollower.style.transform = `translate(-50%, -50%) rotate(${angleDegrees}deg)`;
	}
	// Ajouter un écouteur d'événement pour suivre le mouvement de la souris
	document.addEventListener('mousemove', updateMouseFollower);

	// Sélectionner l'élément "arrow"
	const arrow = document.querySelector('.arrow');
	// Créer un bouton "cercle" initial
	const buttonCercle = document.createElement('button');
	buttonCercle.className = 'cercle';
	buttonCercle.onclick = handleClick; // Associer la fonction de gestion du clic
	buttonCercle.style.left = `${window.innerWidth - 100}px`;
	buttonCercle.style.top = `${window.innerHeight - 100}px`;
	const colors = couleurAleatoire();
	buttonCercle.style.backgroundColor = colors;
	mouseFollower.style.backgroundColor = colors;
	buttonCercle.addEventListener('mouseover', () => { arrow.style.display = 'none'; });
	buttonCercle.addEventListener('mouseout', () => { arrow.style.display = 'block'; });
	// Ajouter le bouton "cercle" au corps (body) du document
	document.body.appendChild(buttonCercle);
}, 2000); // Attendre 2000 millisecondes avant d'exécuter le code