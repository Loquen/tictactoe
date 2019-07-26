/*----- constants -----*/ 
const P1 = 'X';
const P2 = 'O';
let TURN = 1;

/*----- app's state (variables) -----*/ 

/*----- cached element references -----*/ 
let board = document.getElementById('game-board');
let reset = document.getElementById('reset');

/*----- event listeners -----*/ 
board.addEventListener('click', function(evt){
    console.log(evt.target);
    if(TURN === 1){
        evt.target.textContent = P1;
        TURN = -1;
    } else {
        evt.target.textContent = P2;
        TURN = 1;
    }
});

reset.addEventListener('click', function(evt){
    console.log('reset');
});

/*----- functions -----*/