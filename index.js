const gameBoard = document.getElementById('game-board');
const submitBtn = document.getElementById('submit-btn');
const shuffleBtn = document.getElementById('shuffle-btn');

const categories = [
    { name: 'Champions', items: ['Ashe', 'Garen', 'Lux', 'Darius'] },
    { name: 'Roles', items: ['Top', 'Jungle', 'Mid', 'Support'] },
    { name: 'Items', items: ['Infinity Edge', 'Rabadon\'s Deathcap', 'Thornmail', 'Zhonya\'s Hourglass'] },
    { name: 'Map Locations', items: ['Baron Pit', 'Dragon Pit', 'Blue Buff', 'Red Buff'] }
];

let tiles = [];

function initializeGame() {
    tiles = categories.flatMap(category => category.items);
    shuffleTiles();
    renderTiles();
}

function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function renderTiles() {
    gameBoard.innerHTML = '';
    tiles.forEach(tile => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        tileElement.textContent = tile;
        tileElement.addEventListener('click', () => toggleTile(tileElement));
        gameBoard.appendChild(tileElement);
    });
}

function toggleTile(tileElement) {
    tileElement.classList.toggle('selected');
}

function checkSelection() {
    const selectedTiles = document.querySelectorAll('.tile.selected');
    if (selectedTiles.length !== 4) {
        alert('Please select exactly 4 tiles.');
        return;
    }

    const selectedItems = Array.from(selectedTiles).map(tile => tile.textContent);
    const correctCategory = categories.find(category => 
        category.items.every(item => selectedItems.includes(item))
    );

    if (correctCategory) {
        alert(`Correct! You found the "${correctCategory.name}" category.`);
        selectedTiles.forEach(tile => tile.style.backgroundColor = '#90EE90');
    } else {
        alert('Incorrect. Try again!');
        selectedTiles.forEach(tile => tile.classList.remove('selected'));
    }
}

submitBtn.addEventListener('click', checkSelection);
shuffleBtn.addEventListener('click', () => {
    shuffleTiles();
    renderTiles();
});

initializeGame();

