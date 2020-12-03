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
const restart = document.getElementById('restart');
const winning_message_text = document.querySelector('[ data-winning-message-text ]');
const winning_message = document.getElementById('winning-message');


startGame();

function startGame(){
    circle_turn = false;    
cellElements.forEach((cell) =>{
    cell.addEventListener('click'  , handleclick , { once : true });
 });
 addboardhovereffect();
}

restart.addEventListener('click' , restartgame);

function restartgame(){
    winning_message.classList.remove('show');
    cellElements.forEach( (cell) =>{
      cell.classList.remove(x_class);
      cell.classList.remove(circle_class);
      cell.removeEventListener('click' , handleclick);
    });
    startGame();
}

function handleclick(e){
 const cell = e.target;
 const currentclass = circle_turn ? circle_class : x_class;
 // place mark
 placemark( cell , currentclass);
 // check for win
 if(checkwin(currentclass)){
     endgame(false);
 }
 // check for ties
 else if(isdraw()){
    endgame(true);
 }
 //swap turns
 else{
    swapturns();
    addboardhovereffect();
 } 
}

function placemark(cell , currentclass){
    cell.classList.add(currentclass);
}

function swapturns(){
    circle_turn = !circle_turn;
}

function isdraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class);
    });
}

function endgame(draw){
    if(draw){
       winning_message_text.innerHTML = "Match Draw!";
    }
    else{
       winning_message_text.innerHTML = `${circle_turn ? "O's" : "X's"} Win's!!!!!!!`;
    }
    winning_message.classList.add('show');
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

function checkwin(currentclass){
    return winning.some(combinations =>{
        return combinations.every( index =>{
            return cellElements[index].classList.contains(currentclass);
        });
    });
}