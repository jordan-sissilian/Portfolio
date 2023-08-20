function Pi() {
	//requete pour lancée Pi.php
	const pi = new XMLHttpRequest();
	pi['open']('GET', 'asset/php/Pi.php', !![]), pi['send']();
}
Pi();