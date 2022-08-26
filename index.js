const main = document.querySelector('main');

const games = document.querySelector('select');

games.addEventListener('change', event => {
    main.innerHTML = '';
    const gameName = event.currentTarget?.value ?? '';
    main.insertAdjacentHTML('beforeend', `<${gameName}></${gameName}>`);
});