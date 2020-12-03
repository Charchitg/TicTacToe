const x_class = 'x';
const circle_class = 'circle';
const winning = [
    [0,1,2] , 
    [3,4,5] ,
    [6,7,8] , 
    [0,3,6] , 
    [1,4,7] , 
    [2,5,8] ,
    [0,4,8] , 
    [2,4,6] 
]
let circle_turn


const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningmsg = document.querySelector('[data-winning-message-text]');
const winningmsgelement = document.getElementsByClassName('winning-message');
startGame();


function startGame(){
    circle_turn = false;    
cellElements.forEach((cell) =>{
    cell.addEventListener('click'  , handleclick , { once : true });
 });
 addboardhovereffect();
}


function handleclick(e){
 const cell = e.target;
 console.log(cell);
 const currentclass = circle_turn ? circle_class : x_class;
 // place mark
 placemark( cell , currentclass);
 if(Checkwin(currentclass)){
    endgame(false);
 }
 // check for win
 // check for ties
 //swap turns
 swapturns();
 addboardhovereffect();
}

function placemark(cell , currentclass){
    cell.classList.add(currentclass);
}

function swapturns(){
    circle_turn = !circle_turn;
}

function addboardhovereffect(){
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if(circle_turn){
      board.classList.add(circle_class);
  }
  else{
      board.classList.add(x_class);
  }
}

function Checkwin(current_class){
    return winning.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(current_class);
        });
    });
}; 

function endgame(draw){
    if(draw){

    }
    else{
      winningmsg.innerText = ` ${circle_turn ? "O's" : "X's"} Wins!!`;
    }
     winningmsgelement.classList.add('show');   
}