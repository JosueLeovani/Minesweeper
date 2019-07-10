
// ============================
//             Timer
// ============================

var seconds = 0;
var el = document.getElementById('seconds-counter');

function incrementSeconds() {
    seconds += 1;
    el.innerText = seconds;
}

var cancel = setInterval(incrementSeconds, 1000);

function stopSeconds(){
    clearTimeout(cancel);
    seconds = 0
}



// ============================
//             Levels
// ============================
var state = "easy"
function generateTable(height, width) {
    for (let i = 0; i < height; i++){
        let row = document.querySelector('table').insertRow();

        for (let a = 0; a < width; a++){
            let cell = row.insertCell();
            cell.className = "hidden";
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
    if (state === "easy"){
        return 0
    }
    var mine = document.getElementById("quantity_mines");
    mine.innerHTML = 10;

    delete_table(state);
    state = "easy";
    generateTable(9, 9);
    mineRandom(10, 9*9);
}

function medium(){
    if (state === "medium"){
        return 0
    }
    var mine = document.getElementById("quantity_mines");
    mine.innerHTML = 40;

    delete_table(state);
    state = "medium";
    generateTable(16, 16);
    mineRandom(40, 16*16);
}

function hard(){
    if (state === "hard"){
        return 0
    }
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
}



// ============================
//         Mines Random
// ============================
let elems = document.getElementsByClassName('hidden');

function getRandomInt(max) { //Crea un numero aleatoria en el rango que le pongas
    return Math.floor(Math.random() * Math.floor(max));
  }

function mineRandom(quantity, size){
    for (let i = 0; i < quantity; i++){ //llena el board con minas en posiciones aleatorias
        elems[getRandomInt(size)].innerHTML = "J";
    }
}











