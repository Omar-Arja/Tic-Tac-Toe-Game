const cells = document.querySelectorAll('.cell');
const start_game = document.getElementById('start-game');
const game = document.getElementById('game');
const landing_page = document.getElementById('landing-page');
const game_over_div = document.getElementById('game-over');
let player_Name_1 = document.getElementById('player-1');
let score_1 = document.getElementById('score-1');
let player_Name_2 = document.getElementById('player-2');
let score_2 = document.getElementById('score-2');
let game_over_text = document.getElementById('game-over-text');
const continue_btn = document.getElementById('continue');
const restart_btn = document.getElementById('restart');
let score_x = 0;
let score_o = 0;
let winner = null;
const player_x = 'X';
const player_o = 'O';
let turn = player_x;
let game_over = false;


let board_state = Array(cells.length).fill(null);
const strike = document.getElementById('strike');

const winning_combinations = [
    { combo: [0, 1, 2], strike_class: 'strike-row-1' },
    { combo: [3, 4, 5], strike_class: 'strike-row-2' },
    { combo: [6, 7, 8], strike_class: 'strike-row-3' },
    { combo: [0, 3, 6], strike_class: 'strike-column-1' },
    { combo: [1, 4, 7], strike_class: 'strike-column-2' },
    { combo: [2, 5, 8], strike_class: 'strike-column-3' },
    { combo: [0, 4, 8], strike_class: 'strike-diagonal-1' },
    { combo: [2, 4, 6], strike_class: 'strike-diagonal-2' }];


setHover();
cells.forEach(cell => cell.addEventListener('click', handleClick));
start_game.addEventListener('click', startGame);
continue_btn.addEventListener('click', reset);
restart_btn.addEventListener('click', () => {
    window.location.reload();
});

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
            board_state[combination.combo[1]] == board_state[combination.combo[2]] &&
            board_state[combination.combo[0]] != null) {
            strike.classList.add(combination.strike_class);
            if (board_state[combination.combo[0]] == player_x) {
                score_x++;
                winner = player_Name_1;
            }
            else {
                score_o++;
                winner = player_Name_2;
            }
            game_over = true;
            score_1.innerText = score_x;
            score_2.innerText = score_o;
            gameOver();
            return;

        }
    })
    if (!board_state.includes(null) && !game_over) {
        game_over = true;
        gameOver();
        winner = null;
    }
}

function gameOver() {
    if (game_over) {
        game_over_div.classList.remove('hide');
        if (winner != null) {
            game_over_text.innerText = `${winner.innerText} Wins!`;
        }
        else {
            game_over_text.innerText = "It's a Draw!";
        }
    }
    else {
        game_over_div.classList.add('hide');
    }
}

function reset() {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('hover-x');
        cell.classList.remove('hover-o');
    })
    board_state = Array(cells.length).fill(null);
    turn = player_x;
    winner = null;
    game_over = false;
    gameOver();
    strike.classList.remove(
        'strike-row-1',
        'strike-row-2',
        'strike-row-3',
        'strike-column-1',
        'strike-column-2',
        'strike-column-3',
        'strike-diagonal-1',
        'strike-diagonal-2')
    setHover();
}

function startGame() {
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    if (player1 == "") player1 = "X";
    if (player2 == "") player2 = "O";
    landing_page.className = 'hide';
    game.className = 'show';
    player_Name_1.innerText = player1;
    player_Name_2.innerText = player2;
    score_1.innerText = score_x;
    score_2.innerText = score_o;
}