function init(cells, size) {
    let numberOf2 = 2;
    let numberOf0 = (size * size) - numberOf2;
    let tab = [];
    for (let i = 0; i < numberOf2; i++) {
        tab.push(2);
    }
    for (let i = 0; i < numberOf0; i++) {
        tab.push(0);
    }
    cells = shuffle(tab);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function addCells(cells) {
    let emptyCells = [];
    cells.forEach((cell, index) => {
        if (cell === 0) {
            emptyCells.push(index);
        }
    });
    if (emptyCells.length > 0) {
        let index = shuffle(emptyCells)[0];
        cells[index] = 2;
    } else {
        let turns = false;
        for (let i = 0; i < 16; i++) {
            if (checkTurns(cells, i)) {
                turns = true;
                break;
            }
        }
        if (!turns) {
            //gameOver[0] = true;
            alert('Game Over!');
        }
    }
}

function checkTurns(cells, i) {
    let v = cells[i]
    return v === cells[i + 1] || v === cells[i - 1] || v === cells[i + 4] || v === cells[i - 4]
}

function onKeyDown(e, cells, score) {
    if (e.code.includes('ArrowLeft')) {
        let array = [];
        for (let k = 1; k <= 4; k++) {
            ArrowLeft(cells, score, k, array)
        }
        addCells(cells);
    }
    if (e.code.includes('ArrowRight')) {
        let array = [];
        for (let k = 1; k <= 4; k++) {
            ArrowRight(cells, score, k, array)
        }
        addCells(cells);
    }
    if (e.code.includes('ArrowUp')) {
        let array = [];
        for (let k = 1; k <= 4; k++) {
            ArrowUp(cells, score, k, array)
        }
        addCells(cells);
    }
    if (e.code.includes('ArrowDown')) {
        let array = [];
        for (let k = 1; k <= 4; k++) {
            ArrowDown(cells, score, k, array)
        }
        addCells(cells);
    }
}

function ArrowLeft(cells, score, k, arr) {
    for (let i = 0; i < 16; i++) {
        let index = i - 1;
        if (k === 3 && index >= 0 && i % 4 !== 0 && cells[i] !== 0 && cells[index] === cells[i] && ![i].includes(arr)) {
            cells[index] += cells[i];
            score +=cells[index];
            cells[i] = 0;
            arr.push(index);
        }
        if (k !== 3 && index >= 0 && i % 4 !== 0 && cells[index] === 0) {
            cells[index] = cells[i];
            cells[i] = 0;
        }
    }
}

function ArrowRight(cells, score, k, arr) {
    for (let i = 15; i >= 0; i--) {
        let index = i + 1;
        if (k === 3 && index < 16 && i % 4 !== 3 && cells[i] !== 0 && cells[index] === cells[i] && !arr.includes(i)) {
            cells[index] += cells[i];
            score += cells[index];
            cells[i] = 0;
            arr.push(i);
        }
        if (k !== 3 && index < 16 && i % 4 !== 3 && cells[index] === 0) {
            cells[index] = cells[i];
            cells[i] = 0;
        }
    }
}

function ArrowUp(cells, score, k, arr) {
    for (let i = 0; i < 16; i++) {
        let index = i - 4;
        if (k === 3 && index >= 0 && cells[index] === cells[i] && cells[i] !== 0 && ![i].includes(arr)) {
            cells[index] += cells[i];
            score +=cells[index];
            cells[i] = 0;
        }
        if (k !== 3 && index >= 0 && cells[index] === 0) {
            cells[index] = cells[i];
            cells[i] = 0;
        }
    }
}

function ArrowDown(cells, score, k, arr) {
    for (let i = 15; i >= 0; i--) {
        let index = i + 4;
        if (k === 3 && index < 16 && cells[i] !== 0 && cells[index] === cells[i] && !arr.includes(i)) {
            cells[index] += cells[i];
            score += cells[index];
            cells[i] = 0;
            arr.push(i);
        }
        if (k !== 3 && index < 16 && cells[index] === 0) {
            cells[index] = cells[i];
            cells[i] = 0;
        }
    }
}


export { init, shuffle, onKeyDown };