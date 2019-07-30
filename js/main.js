/*----- constants -----*/ 
const COLORS = {
    '0': 'white',
    '1': 'blue',
    '-1': 'pink'
};

const WIN = [3, -3];

// Ended up not needing this
const WINTABLE = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [0, 4, 6]
];
/*----- app's state (variables) -----*/ 
let board, turn, winner

/*----- cached element references -----*/ 
// let boardLayout = document.getElementById('game-board');
let msgEl = document.getElementById('msg');

/*----- event listeners -----*/ 
document.querySelector('#game-board')
  .addEventListener('click', handlePlayClick);

document.getElementById('reset').addEventListener('click', init);

/*----- functions -----*/
init();

function init(){
    board = [0,0,0,0,0,0,0,0,0];
    turn = 1;
    winner = null; // 1, -1, null (no winner, falsey), 'T'(tie)

    render();
    confetti.stop();
}

function render(){
    board.forEach(function(cell, idx){
        let div = document.getElementById(`cell${idx}`);
        div.style.backgroundColor = COLORS[cell];            
    });

    if(winner){
        // Winning!
        if(winner === 'T'){
            msgEl.textContent = 'Tie! Try Again!';
        } else {
            msgEl.textContent =`${COLORS[winner].toUpperCase()} Wins!`
        }
    } else {
        msgEl.textContent = `${COLORS[turn].toUpperCase()}'s Turn`;
    }
}

function handlePlayClick(evt){
    let idx = evt.target.id.replace('cell', '');
    if(isNaN(idx) || winner) return;
    if(board[idx] !== 0) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}

function getWinner(){
    // initialize all possible win routes
    let state = [0,0,0,0,0,0,0,0];
    let winningLine;
   
    state[0] = board[0] + board[1] + board[2];
    state[1] = board[3] + board[4] + board[5];
    state[2] = board[6] + board[7] + board[8];
    state[3] = board[0] + board[3] + board[6];
    state[4] = board[1] + board[4] + board[7];
    state[5] = board[2] + board[5] + board[8];
    state[6] = board[0] + board[4] + board[8];
    state[7] = board[2] + board[4] + board[6];

    // WINTABLE.forEach(function(line, idx){
    //     let sum = Math.abs(board[line[0]] + board[line[1]] + board[line[2]]);
    //     if(sum === 3){
    //         console.log(board[line[0]]);
    //         winningLine = board[line[0]];
    //         return board[line[0]];
    //     }
    // });  

    if(state.indexOf(WIN[0]) >= 0 || state.indexOf(WIN[1]) >= 0){
        if(state.indexOf(WIN[0]) >= 0){
            winningLine = state.indexOf(WIN[0]);
        } else {
            winningLine = state.indexOf(WIN[1]); 
        }
    };

    if(winningLine >= 0){
        confetti.start();
        return state[winningLine] / 3;
    } else if(state.indexOf(0) === -1){
        return 'T';
    }
}