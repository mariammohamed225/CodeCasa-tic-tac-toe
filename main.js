let player = document.getElementById('player');
let btn = document.getElementById('restart');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O = "O";
const X = "X";

let current = X;
let spaces = Array(9).fill(null);

const start = () => {
    boxes.forEach(box => box.addEventListener('click', clicked));
}

function clicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = current;
        e.target.innerText = current; 
        let win = checkWin(); 
        if (win !== false) {
            player.innerHTML = `${current} won`;

            let blocks = win;
            blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator); 
            return;
        }
        current = current == X ? O : X;
    }
}

function checkWin() {
    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (const condition of winning) {
        let [a, b, c] = condition;
        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) { 
            return [a, b, c];
        }
    }
    return false;
}

btn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = ' '; 
        box.style.backgroundColor = ''; 
    })

    player.innerHTML = 'Tic Tac Toe';
    current = X;
}

start();
