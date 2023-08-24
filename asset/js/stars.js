const numStars = 100; // Nombre d'étoiles

const starsContainer = document.querySelector('.stars');

for (let i = 0; i < numStars; i++) {
	const star = document.createElement('div');
	star.className = 'star';
	star.style.left = `${Math.random() * 100}vw`;
	star.style.top = `${Math.random() * 100}vh`;
	let size = Math.random() * 2.2 + 0.8;
	star.style.width = `${size}px`;
	star.style.height = `${size}px`;
	star.style.animationDuration = `${Math.random() * 2 + 1}s`;
	starsContainer.appendChild(star);
}