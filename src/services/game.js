function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkTurns(cells, i) {
    let v = cells[i]
    return v === cells[i + 1] || v === cells[i - 1] || v === cells[i + 4] || v === cells[i - 4]
}

function ArrowLeft(cells, score, k, arr) {
    for (let i = 0; i < 16; i++) {
        let index = i - 1;
        if (k === 3 && index >= 0 && i % 4 !== 0 && cells[i] !== 0 && cells[index] === cells[i] && ![i].includes(arr)) {
            cells[index] *= 2;
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
            cells[index] *= 2;
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
            cells[index] *= 2;
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
            cells[index] *= 2;
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


export { shuffle, ArrowUp, ArrowRight, ArrowLeft, ArrowDown, checkTurns };