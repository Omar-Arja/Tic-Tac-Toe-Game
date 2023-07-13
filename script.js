const cells = document.querySelectorAll('.cell');
const player_x = 'X';
const player_o = 'O';
let turn = player_x;
let game_over = false;

let board_state = Array(cells.length).fill(null);

const strike = document.getElementById('strike');

setHover();

const winning_combinations = [
    { combo: [0, 1, 2], strike_class: 'strike-row-1' },
    { combo: [3, 4, 5], strike_class: 'strike-row-2' },
    { combo: [6, 7, 8], strike_class: 'strike-row-3' },
    { combo: [0, 3, 6], strike_class: 'strike-column-1' },
    { combo: [1, 4, 7], strike_class: 'strike-column-2' },
    { combo: [2, 5, 8], strike_class: 'strike-column-3' },
    { combo: [0, 4, 8], strike_class: 'strike-diagonal-1' },
    { combo: [2, 4, 6], strike_class: 'strike-diagonal-2' }];

cells.forEach(cell => cell.addEventListener('click', handleClick));

function handleClick(e) {
    if (game_over) return;
    const cell = e.target;
    const index = cell.dataset.index;
    if (cell.innerText != "") return;
    if (turn == player_x) {
        cell.innerText = 'X';
        board_state[index] = player_x;
        turn = player_o
    }
    else {
        cell.innerText = 'O';
        board_state[index] = player_o;
        turn = player_x;
    }
    setHover();
    checkWinner();
}

function setHover() {
    cells.forEach(cell => {
        cell.classList.remove('hover-x');
        cell.classList.remove('hover-o');
        if (cell.innerText == "" && turn == player_x) cell.classList.add('hover-x');
        else if (cell.innerText == "" && turn == player_o) cell.classList.add('hover-o');
    })
}

function checkWinner() {
    winning_combinations.forEach(combination => {
        if (board_state[combination.combo[0]] == board_state[combination.combo[1]] &&
            board_state[combination.combo[1]] == board_state[combination.combo[2]] && board_state[combination.combo[0]] != null) {
                strike.classList.add(combination.strike_class);
                game_over = true;
            }
    })
}