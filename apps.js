
var state = "none";
let board = [];
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
            if(i > 9){
                cell.id = `${i}+${a}`;
            }else{
                cell.id = `${i}${a}`;
            }
            
        }
    }
    let get_rows = document.getElementsByClassName('row');
    for (rows of get_rows){
        board.push(rows.cells);
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
    even_call();
}

function medium(){
    var mine = document.getElementById("quantity_mines");
    mine.innerHTML = 40;

    delete_table(state);
    state = "medium";
    generateTable(16, 16);
    mineRandom(40, 16*16);
    even_call();
}

function hard(){
    var mine = document.getElementById("quantity_mines");
    mine.innerHTML = 99;

    delete_table(state);
    state = "hard";
    generateTable(16, 30);
    mineRandom(99, 16*30);
    even_call();
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
let seeker = [[-1, -1], [-1, 0], [-1, +1], [0, -1], [0, +1], [+1, -1], [+1, 0], [+1, +1]];


function even_call(){
    board.forEach((fila)=>{
        [...fila].forEach((casilla) => { //[...value] conver the html conetion to a array
            casilla.addEventListener("click", (() => {
                let pos = casilla.id;
                first_mine(pos,state);
            }));
        });
    })
}    

function first_mine(pos, state){
    let place = document.getElementById(pos).innerHTML;

    if (place === "J"){
        console.log("You Died");
        return 0
    }

    let pos_abya = get_adyacentes(pos);
    if(pos_abya === true){
        return 0
    }
    let count = 0
    pos_abya.forEach((elementos) => {
        let elem =document.getElementById(elementos).innerHTML;
        if (elem === "J"){
            count++;
        }
    })
    
    if (count != 0){
        document.getElementById(pos).innerHTML = count;
    }else{
        space_whites(pos);
    }
}

function space_whites(pos){


    let pos_abya = get_adyacentes(pos);
    if(pos_abya === true){
        return 0
    }
    let count = 0
    pos_abya.forEach((elementos) => {
        let elem =document.getElementById(elementos).innerHTML;
        if (elem === "J"){
            count++;
        }
    })
    
    if (count != 0){
        document.getElementById(pos).innerHTML = count;
        return 0
    }else{
        console.log("aqui");
        document.getElementById(pos).innerHTML = "";
        pos_abya.forEach((pos)=>{
            console.log(pos);
            space_whites(pos);
        })
    }
}


function get_adyacentes(pos){
    let array_pos = [];
    let array_state = [];
    switch(pos.length){
        case 2:
            if (board_state[pos[0]][pos[1]] === 1 & board[pos[0]][pos[1]].innerHTML != ""){
                return true
            }else{
                board_state[pos[0]][pos[1]] = 1;
            }
            seeker.forEach((see) => {
                let x = Number(pos[0]) + see[0];
                let y = Number(pos[1]) + see[1];
                if (x < 0 || y < 0 || x > board_state[0].length - 1 || y > board_state.length - 1){
                    return 0
                }
                if (x > 9){
                    array_pos.push(x.toString() + "+" + y.toString());
                }else{
                    array_pos.push(x.toString() + y.toString());
                }
                if (board_state[x][y] === 1){
                    return true
                };
            })
            return array_pos
            break;
            
        case 3:
            if(board_state[pos[0]][pos[1] + pos[2]] === 1 & board[pos[0]][pos[1] + pos[2]].innerHTML != ""){
                return true
            }else{
                board_state[pos[0]][pos[1] + pos[2]] = 1;
            }
            seeker.forEach((see) => {
                let x = Number(pos[0]) + see[0];
                let y = Number(pos[1] + pos[2]) + see[1];
                if (x < 0 || y < 0 || x > board_state[0].length - 1 || y > board_state.length - 1){
                    return 0
                }
                if (x > 9){
                    array_pos.push(x.toString() + "+" + y.toString());
                }else{
                    array_pos.push(x.toString() + y.toString());
                }
            })
            return array_pos
            break;
        case 4:
            if(board_state[pos[0] + pos[1]][pos[3]] === 1 & board[pos[0] + pos[1]][pos[3]].innerHTML != ""){
                return true
            }else{
                board_state[pos[0] + pos[1]][pos[3]] = 1;
            }
            seeker.forEach((see) => {
                let x = Number(pos[0] + pos[1]) + see[0];
                let y = Number(pos[3]) + see[1];
                if (x < 0 || y < 0 || x > board_state[0].length - 1 || y > board_state.length - 1){
                    return 0
                }
                if (x > 9){
                    array_pos.push(x.toString() + "+" + y.toString());
                }else{
                    array_pos.push(x.toString() + y.toString());
                }
            })
            return array_pos
            break;
        case 5:
            if(board_state[pos[0] + pos[1]][pos[3] + pos[4]] === 1 & board[pos[0] + pos[1]][pos[3] + pos[4]].innerHTML != ""){
                return true
            }else{
                board_state[pos[0] + pos[1]][pos[3] + pos[4]] = 1;
            }
            seeker.forEach((see) => {
                let x = Number(pos[0] + pos[1]) + see[0];
                let y = Number(pos[3] + pos[4]) + see[1];
                if (x < 0 || y < 0 || x > board_state[0].length - 1 || y > board_state.length - 1){
                    return 0
                }
                if (x > 9){
                    array_pos.push(x.toString() + "+" + y.toString());
                }else{
                    array_pos.push(x.toString() + y.toString());
                }
            })
            return array_pos
            break;
    };
    
};





