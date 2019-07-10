
var state = "none"
let board_state = [];
// ============================
//             Timer
// ============================

var seconds = 0;
var el = document.getElementById('seconds-counter');

function incrementSeconds() {
    seconds += 1;
    el.innerText = seconds;
}



function reset(){

    console.log(state)
    switch(state){
        case "easy":
            easy();
            break;
        case "medium":
            medium();
            break; 
        case "hard":
            hard();
            break;
        case "custom":
            custom();
            break;
        case "none":
            console.log("hello");
            break;
    }
    var cancel = setInterval(incrementSeconds, 1000);
    // clearTimeout(cancel);
    // seconds = 0
}



// ============================
//             Levels
// ============================

function generateTable(height, width) { //genera al mismo tiempo el board_state
    board_state = [];
    for (let i = 0; i < height; i++){
        let row = document.querySelector('table').insertRow();
        board_state.push([]);
        row.className = "row";
        for (let a = 0; a < width; a++){
            let cell = row.insertCell();
            board_state[i].push(0);
            cell.className = "hidden";
            cell.id = `${i}${a}`;
        }
    }
}

function delete_table(state){
    switch(state){
        case "easy":
            for(let i = 1; i < 10; i++){
                document.querySelector('table').deleteRow(1);    
            }
            break;

        case "medium":
            for(let i = 1; i < 17; i++){
                document.querySelector('table').deleteRow(1);
            }
            break;
        case "hard":
            for(let i = 1; i < 17; i++){
                document.querySelector('table').deleteRow(1);
            }
            break;     
    }
}

function easy(){
    var mine = document.getElementById("quantity_mines");
    mine.innerHTML = 10;

    delete_table(state);
    state = "easy";
    generateTable(9, 9);
    mineRandom(10, 9*9);
}

function medium(){
    var mine = document.getElementById("quantity_mines");
    mine.innerHTML = 40;

    delete_table(state);
    state = "medium";
    generateTable(16, 16);
    mineRandom(40, 16*16);
}

function hard(){
    var mine = document.getElementById("quantity_mines");
    mine.innerHTML = 99;

    delete_table(state);
    state = "hard";
    generateTable(16, 30);
    mineRandom(99, 16*30);
}

function custom(){
    var mine = document.getElementById("quantity_mines")
    mine.innerHTML = "en trabajo (┛◉Д◉)┛彡┻━┻"
    state = "custom";
}



// ============================
//         Mines Random
// ============================
let elems = document.getElementsByClassName('hidden');

function getRandomInt(max) { //Crea un numero aleatoria en el rango que le pongas
    return Math.floor(Math.random() * Math.floor(max));
  }

function mineRandom(quantity, size){
    for (let i = 0; i < quantity; ){ //llena el board con minas en posiciones aleatorias
        let random = getRandomInt(size);
        if(elems[random].innerHTML != "J"){
            elems[random].innerHTML = "J";
            i++;
        }
    }
}

easy();

// let i = 0;    //esto es para probar 
// for (elem of elems){ //que ponga la cantida de minas correctamente
//     if (elem.innerHTML === "J"){
//         i = i + 1;
//     };
// }
// console.log(i);



// ============================
//     First Click Algorithm
// ============================
let first_click = false;
let board = [];
let seeker = [[-1, -1], [-1, 0], [-1, +1], [0, -1], [0, +1], [+1, -1], [+1, 0], [+1, +1]];


//trae la tabla de html a un array bidimensional para poder interactuar
let get_rows = document.getElementsByClassName('row');
for (rows of get_rows){
    board.push(rows.cells);
}



for (k of board){
    for(i of k){
        i.addEventListener("click", ((a) => {
            a = i.id
            console.log();
        }));


    }
}



