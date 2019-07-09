
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
function generateTable(height, width) {
    for (let i = 0; i <= height; i++){
        let row = document.querySelector('table').insertRow();

        for (let i = 0; i <= width; i++){
            let cell = row.insertCell();
            cell.className = "perra";
        }
    }
}

function delete_table(height){
    for(let i = 1; i < height; i++){
        document.querySelector('table').deleteRow(1);
    }
}

function easy(){
    var mine = document.getElementById("quantity_mines")
    mine.innerHTML = 10
}

function medium(){
    var mine = document.getElementById("quantity_mines")
    mine.innerHTML = 40

    delete_table(10)
    generateTable(16, 16);
    
}

function hard(){
    var mine = document.getElementById("quantity_mines")
    mine.innerHTML = 99
    generateTable(16, 30);
}

function custom(){
    var mine = document.getElementById("quantity_mines")
    mine.innerHTML = "en trabajo (┛◉Д◉)┛彡┻━┻"
}



// ============================
//             Levels
// ============================







