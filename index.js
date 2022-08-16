const main = document.querySelector('main');

const games = document.querySelectorAll('input[type=radio]');

games.forEach(btn => btn.addEventListener('change', event => {
		main.innerHTML = '';
		const gameName = event.currentTarget?.value ?? '';
		main.insertAdjacentHTML('beforeend', `<${gameName}></${gameName}>`);
	}));