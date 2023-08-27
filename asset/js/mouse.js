setTimeout(() => {
	const mouseFollower = document.createElement('div');
	mouseFollower.className = 'mouse-follower';
	document.body.appendChild(mouseFollower);
	// Fonction pour mettre à jour la position du suiveur de souris
	function updateMouseFollower(event) {
		const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollY = window.pageYOffset || document.documentElement.scrollTop;

		mouseFollower.style.left = `${event.pageX + scrollX}px`;
		mouseFollower.style.top = `${event.pageY + scrollY}px`;
	}
	document.addEventListener('mousemove', updateMouseFollower);
}, 2000); // Attendre 2000 millisecondes avant d'exécuter le code