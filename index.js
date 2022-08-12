const main = document.querySelector('main');

document.querySelectorAll('input[type=radio]')
	.forEach(btn => btn.addEventListener('change', event => {
		main.innerHTML = '';
		const gameName = event.currentTarget?.value ?? '';
		main.insertAdjacentHTML('beforeend', `<${gameName}></${gameName}>`);
	}));