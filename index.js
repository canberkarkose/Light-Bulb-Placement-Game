const easyButton = document.querySelector("#easy");
const advancedButton = document.querySelector("#advanced");
const extremeButton = document.querySelector("#extreme");
var explanation = document.querySelector("#explanation");
var lightbulb = `<i class="fa fa-lightbulb-o" style="font-size:30px;color:orange"></i>`
const username = document.getElementById("name");
const usernameIngame = document.getElementById("usernameIngame");
var center = document.createElement('center');
var table = document.createElement("table");
var tableStructure = [];
const zeroCellValue = -10000;



// Event Listeners
easyButton.addEventListener("click", function (e) {
    if (username.value == "") {
        alert("Please enter your name");
    }
    else {
        alert("Welcome to easy mode " + username.value);
        table.innerHTML = "";
        generateEasy();
        explanation.innerHTML = ""
        username.style.display = "none";
        usernameIngame.style.display = "block";
        usernameIngame.style.color = "white";
        usernameIngame.innerHTML = username.value + "'s playing";

        setInterval(setTime, 1000);
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;

        function setTime() {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
    }
});


advancedButton.addEventListener("click", function (e) {
    if (username.value == "") {
        alert("Please enter your name");
    }
    else {
        alert("Welcome to advanced mode " + username.value);
        table.innerHTML = "";
        generateAdvanced();
        explanation.innerHTML = ""
        username.style.display = "none";
        usernameIngame.style.display = "block";
        usernameIngame.style.color = "white";
        usernameIngame.innerHTML = username.value + "'s playing";
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);
        function setTime() {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
    }
});


extremeButton.addEventListener("click", function (e) {
    if (username.value == "") {
        alert("Please enter your name");
    }
    else {
        alert("Welcome to extreme mode " + username.value);
        table.innerHTML = "";
        generateExtreme();
        explanation.innerHTML = ""
        username.style.display = "none";
        usernameIngame.style.display = "block";
        usernameIngame.style.color = "white";
        usernameIngame.innerHTML = username.value + "'s playing";
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);
        function setTime() {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
    }
})


// Generating the tables
function generateEasy() {
    tableStructure = new Array(7).fill([]);
    for (let i = 0; i < 7; i++) {
        tableStructure[i] = new Array(7).fill(0);
        var row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            var cell = document.createElement("td");
            if (i == 0 && j == 3 || i == 1 && j == 1 || i == 1 && j == 5
                || i == 3 && j == 0 || i == 3 && j == 3 || i == 3 && j == 6
                || i == 5 && j == 1 || i == 5 && j == 5 || i == 6 && j == 3) {
                cell.setAttribute("class", "cell blackcell");
                cell.id = `${i},${j}`
                row.appendChild(cell);
                if (i == 0 && j == 3) {
                    cell.innerHTML = `<font color="white" size="5">1</font>`;
                    tableStructure[i][j] = -1;
                } else if (i == 1 && j == 5 || i == 5 && j == 5) {
                    cell.innerHTML = `<font color="white" size="5">2</font>`;
                    tableStructure[i][j] = -2;
                } else if (i == 1 && j == 1) {
                    cell.innerHTML = `<font color="white" size="5">0</font>`;
                    tableStructure[i][j] = zeroCellValue;
                } else if (i == 6 && j == 3) {
                    cell.innerHTML = `<font color="white" size="5">3</font>`;
                    tableStructure[i][j] = -3;
                } else if (i == 3 && j == 0 || i == 3 && j == 3 || i == 3 && j == 6 || i == 5 && j == 1) {
                    tableStructure[i][j] = -20000;
                }
            } else {
                cell.setAttribute("class", "cell whitecell")
                row.appendChild(cell);
                cell.id = `${i},${j}`
                cell.addEventListener("click", function (e) {
                    let isLightBulbsInaRow = false;
                    let areBlackLightsCovered = false;
                    if (e.target.matches('td') && e.target.innerHTML == "") {
                        e.target.innerHTML = lightbulb
                        e.target.classList.remove("whitecell");
                        e.target.classList.add("yellowcell");
                        addYellowTile(i, j);
                        tableStructure[i][j] = 1;
                        areBlackLightsCovered = checkLightCount();
                        isLightBulbsInaRow = checkRowColumn2(i, j);
                        if (isLightBulbsInaRow == false) {
                            e.target.classList.remove("yellowcell");
                            e.target.classList.add("redcell");
                            alert("You put lightbulb in wrong place! Please remove it and try putting somewhere else! Be sure to check the broken lightbulbs! Since you put lightbulb in wrong place, some of the lightbulbs may be broken, replace them if needed!");
                        }
                    } else {
                        if (e.target.matches('i') && e.target.parentNode.innerHTML !== "") {
                            e.target.parentNode.classList.remove("yellowcell");
                            e.target.parentNode.classList.remove("redcell");
                            e.target.parentNode.classList.add("whitecell");
                            e.target.parentNode.innerHTML = ""
                            removeYellowTile(i, j);
                            areBlackLightsCovered = checkLightCount();
                        }
                    }
                    const noWhiteLeft = checkIsWhite();
                    if (isLightBulbsInaRow && areBlackLightsCovered && noWhiteLeft) {
                        alert("YOU WON! NOW YOU CAN PROCEED TO NEXT LEVEL!");
                        location.reload();
                    }
                    saveGame()
                })
            }
        }
        table.appendChild(row);
    }
}



function generateAdvanced() {
    tableStructure = new Array(7).fill([]);
    for (let i = 0; i < 7; i++) {
        tableStructure[i] = new Array(7).fill(0);
        var row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            var cell = document.createElement("td");
            if (i == 0 && j == 2 || i == 0 && j == 4 || i == 2 && j == 0
                || i == 2 && j == 2 || i == 2 && j == 4 || i == 2 && j == 6
                || i == 3 && j == 3 || i == 4 && j == 0 || i == 4 && j == 2
                || i == 4 && j == 4 || i == 4 && j == 6 || i == 6 && j == 2
                || i == 6 && j == 4) {
                cell.setAttribute("class", "cell blackcell")
                cell.id = `${i},${j}`
                row.appendChild(cell);
                if (i == 0 && j == 2) {
                    cell.innerHTML = `<font color="white" size="5">0</font>`;
                    tableStructure[i][j] = zeroCellValue;
                } else if (i == 2 && j == 4) {
                    cell.innerHTML = `<font color="white" size="5">3</font>`;
                    tableStructure[i][j] = -3;
                } else if (i == 3 && j == 3) {
                    cell.innerHTML = `<font color="white" size="5">1</font>`;
                    tableStructure[i][j] = -1;
                } else if (i == 4 && j == 0 || i == 6 && j == 4) {
                    cell.innerHTML = `<font color="white" size="5">2</font>`;
                    tableStructure[i][j] = -2;
                } else if (i == 0 && j == 4 || i == 2 && j == 0 || i == 2 && j == 2 || i == 2 && j == 6 || i == 4 && j == 2
                    || i == 4 && j == 4 || i == 4 && j == 6 || i == 6 && j == 2) {
                    tableStructure[i][j] = -20000;
                }
            } else {
                cell.setAttribute("class", "cell whitecell")
                row.appendChild(cell);
                cell.id = `${i},${j}`
                cell.addEventListener("click", function (e) {
                    let isLightBulbsInaRow = false;
                    let areBlackLightsCovered = false;
                    if (e.target.matches('td') && e.target.innerHTML == "") {
                        e.target.innerHTML = lightbulb
                        e.target.classList.remove("whitecell");
                        e.target.classList.add("yellowcell");
                        addYellowTile(i, j);
                        tableStructure[i][j] = 1;
                        areBlackLightsCovered = checkLightCount();
                        isLightBulbsInaRow = checkRowColumn2(i, j);
                        if (isLightBulbsInaRow == false) {
                            e.target.classList.remove("yellowcell");
                            e.target.classList.add("redcell");
                            alert("You put lightbulb in wrong place! Please remove it and try putting somewhere else! Be sure to check the broken lightbulbs! Since you put lightbulb in wrong place, some of the lightbulbs may be broken, replace them if needed!");
                        }
                    } else {
                        if (e.target.matches('i') && e.target.parentNode.innerHTML !== "") {
                            e.target.parentNode.classList.remove("yellowcell");
                            e.target.parentNode.classList.remove("redcell");
                            e.target.parentNode.classList.add("whitecell");
                            e.target.parentNode.innerHTML = ""
                            removeYellowTile(i, j);
                            areBlackLightsCovered = checkLightCount();
                        }
                    }
                    const noWhiteLeft = checkIsWhite();
                    if (isLightBulbsInaRow && areBlackLightsCovered && noWhiteLeft) {
                        alert("YOU WON! NOW YOU CAN PROCEED TO NEXT LEVEL!");
                        location.reload();
                    }

                    saveGame()
                })
            }
        }
        table.appendChild(row);
    }
}


function generateExtreme() {
    tableStructure = new Array(10).fill([]);
    for (let i = 0; i < 10; i++) {
        tableStructure[i] = new Array(10).fill(0);
        var row = document.createElement("tr");
        row.setAttribute("class", "rowExtreme");
        for (let j = 0; j < 10; j++) {
            var cell = document.createElement("td");
            if (i == 0 && j == 1 || i == 1 && j == 5 || i == 1 && j == 7 || i == 1 && j == 9
                || i == 2 && j == 1 || i == 2 && j == 2 || i == 2 && j == 7 || i == 3 && j == 4
                || i == 4 && j == 1 || i == 4 && j == 4 || i == 4 && j == 5 || i == 4 && j == 6
                || i == 5 && j == 3 || i == 5 && j == 4 || i == 5 && j == 5 || i == 5 && j == 8
                || i == 6 && j == 5 || i == 7 && j == 2 || i == 7 && j == 7 || i == 7 && j == 8
                || i == 8 && j == 0 || i == 8 && j == 2 || i == 8 && j == 4 || i == 9 && j == 8) {
                cell.setAttribute("class", "cell blackcell")
                row.appendChild(cell);
                cell.id = `${i},${j}`
                if (i == 1 && j == 5 || i == 5 && j == 8 || i == 8 && j == 0) {
                    cell.innerHTML = `<font color="white" size="5">3</font>`;
                    tableStructure[i][j] = -3;
                } else if (i == 2 && j == 1 || i == 7 && j == 7 || i == 8 && j == 4 || i == 9 && j == 8) {
                    cell.innerHTML = `<font color="white" size="5">0</font>`;
                    tableStructure[i][j] = zeroCellValue;
                } else if (i == 4 && j == 1 || i == 4 && j == 5 || i == 7 && j == 2) {
                    cell.innerHTML = `<font color="white" size="5">1</font>`;
                    tableStructure[i][j] = -1;
                } else if (i == 1 && j == 7) {
                    cell.innerHTML = `<font color="white" size="5">2</font>`;
                    tableStructure[i][j] = -2;
                } else if (i == 0 && j == 1 || i == 1 && j == 9 || i == 2 && j == 2 || i == 2 && j == 7 || i == 3 && j == 4 || i == 4 && j == 4 || i == 4 && j == 6 || i == 5 && j == 3 || i == 5 && j == 5 || i == 6 && j == 5 || i == 7 && j == 8 || i == 8 && j == 2) {
                    tableStructure[i][j] = -20000;
                }
            } else {
                cell.setAttribute("class", "cell whitecell")
                row.appendChild(cell);
                cell.id = `${i},${j}`
                cell.addEventListener("click", function (e) {
                    if (e.target.matches('td') && e.target.innerHTML == "") {
                        e.target.innerHTML = lightbulb
                        e.target.classList.remove("whitecell");
                        e.target.classList.add("yellowcell");
                        addYellowTile(i, j);
                        tableStructure[i][j] = 1;
                        areBlackLightsCovered = checkLightCount();
                        isLightBulbsInaRow = checkRowColumn2(i, j);
                        if (isLightBulbsInaRow == false) {
                            e.target.classList.remove("yellowcell");
                            e.target.classList.add("redcell");
                            alert("You put lightbulb in wrong place! Please remove it and try putting somewhere else! Be sure to check the broken lightbulbs! Since you put lightbulb in wrong place, some of the lightbulbs may be broken, replace them if needed!");
                        }
                    } else {
                        if (e.target.matches('i') && e.target.parentNode.innerHTML !== "") {
                            e.target.parentNode.classList.remove("yellowcell");
                            e.target.parentNode.classList.remove("redcell");
                            e.target.parentNode.classList.add("whitecell");
                            e.target.parentNode.innerHTML = ""
                            removeYellowTile(i, j);
                            areBlackLightsCovered = checkLightCount();
                        }
                    }
                    const noWhiteLeft = checkIsWhite();
                    if (isLightBulbsInaRow && areBlackLightsCovered && noWhiteLeft) {
                        alert("YOU WON! NOW YOU CAN PROCEED TO NEXT LEVEL!");
                        location.reload();
                    }
                    saveGame()
                })
            }
        }
        table.appendChild(row);
    }
}

center.appendChild(table);
table.setAttribute('cellspacing', '0');
table.setAttribute('width', '360px');
table.setAttribute('height', '360px');
document.body.appendChild(center);



// Utilities
function checkIsWhite() {
    for (let i = 0; i < tableStructure.length; i++) {
        for (let j = 0; j < tableStructure[0].length; j++) {
            let element = document.getElementById(`${i},${j}`);
            if (element.classList.contains("whitecell")) {
                return false;
            }
        }
    }
    return true;
}

function checkLightCount() {
    let isBlacksValid = true;
    for (let i = 0; i < tableStructure.length; i++) {
        for (let j = 0; j < tableStructure[0].length; j++) {
            if (tableStructure[i][j] < 0 && tableStructure[i][j] > -1000) {
                let val = tableStructure[i][j];
                if (i > 0) val += tableStructure[i - 1][j];
                if (i < tableStructure.length - 1) val += tableStructure[i + 1][j];
                if (j > 0) val += tableStructure[i][j - 1];
                if (j < tableStructure[0].length - 1) val += tableStructure[i][j + 1];

                if (val != 0) {
                    document.getElementById(`${i},${j}`).innerHTML = document.getElementById(`${i},${j}`).innerHTML.replace("white", "red");
                    document.getElementById(`${i},${j}`).innerHTML = document.getElementById(`${i},${j}`).innerHTML.replace("green", "red");
                    isBlacksValid = false;
                }
                else {
                    document.getElementById(`${i},${j}`).innerHTML = document.getElementById(`${i},${j}`).innerHTML.replace("white", "green");
                    document.getElementById(`${i},${j}`).innerHTML = document.getElementById(`${i},${j}`).innerHTML.replace("red", "green");
                }
            }
            else if (tableStructure[i][j] == zeroCellValue) {
                let val = 0;
                if (i > 0 && tableStructure[i - 1][j] == 1) val += tableStructure[i - 1][j];
                if (i < tableStructure.length - 1 && tableStructure[i + 1][j] == 1) val += tableStructure[i + 1][j];
                if (j > 0 && tableStructure[i][j - 1] == 1) val += tableStructure[i][j - 1];
                if (j < tableStructure[0].length - 1 && tableStructure[i][j + 1] == 1) val += tableStructure[i][j + 1];

                if (val > 0) {
                    isBlacksValid = false;
                    document.getElementById(`${i},${j}`).innerHTML = document.getElementById(`${i},${j}`).innerHTML.replace("white", "red");
                    document.getElementById(`${i},${j}`).innerHTML = document.getElementById(`${i},${j}`).innerHTML.replace("green", "red");
                }
                else {
                    document.getElementById(`${i},${j}`).innerHTML = document.getElementById(`${i},${j}`).innerHTML.replace("white", "green");
                    document.getElementById(`${i},${j}`).innerHTML = document.getElementById(`${i},${j}`).innerHTML.replace("red", "green");
                }
            }
        }
    }
    return isBlacksValid;
}

function checkRowColumn2(row, column) {

    var lightbulbs = document.querySelectorAll("i");
    for (let i = 0; i < lightbulbs.length; i++) {
        var lightbulb = lightbulbs[i];
        var countBulb = 0;
        for (let j = 0; j < tableStructure[column].length; j++) {
            const columnValue = tableStructure[row][j];
            if (columnValue < 0) {
                countBulb = 0;
            }
            if (columnValue === 1) {
                countBulb += 1;
            }
            if (countBulb > 1) {
                return false;
            }
        }

        countBulb = 0;
        for (let k = 0; k < tableStructure.length; k++) {
            const rowValue = tableStructure[k][column];
            if (rowValue < 0) {
                countBulb = 0;
            }
            if (rowValue === 1) {
                countBulb += 1;
            }
            if (countBulb > 1) {
                return false;
            }
        }
    }
    return true;
}



function addYellowTile(row, col) {
    let k = row + 1
    while (k < table.rows.length && !(table.rows[k].cells[col].classList.contains("blackcell"))) {
        table.rows[k].cells[col].classList.remove("whitecell");
        table.rows[k].cells[col].classList.add("yellowcell");
        k++;
    }
    k = row - 1
    while (k >= 0 && !(table.rows[k].cells[col].classList.contains("blackcell"))) {
        table.rows[k].cells[col].classList.remove("whitecell");
        table.rows[k].cells[col].classList.add("yellowcell");
        k--;
    }
    k = col + 1
    while (k < table.rows.length && !(table.rows[row].cells[k].classList.contains("blackcell"))) {
        table.rows[row].cells[k].classList.remove("whitecell");
        table.rows[row].cells[k].classList.add("yellowcell");
        k++;
    }
    k = col - 1
    while (k >= 0 && !(table.rows[row].cells[k].classList.contains("blackcell"))) {
        table.rows[row].cells[k].classList.remove("whitecell");
        table.rows[row].cells[k].classList.add("yellowcell");
        k--;
    }
}

function removeYellowTile(row, col) {
    tableStructure[row][col] = 0
    let k = row + 1
    while (k < table.rows.length && !(table.rows[k].cells[col].classList.contains("blackcell"))) {
        table.rows[k].cells[col].classList.remove("yellowcell");
        table.rows[k].cells[col].classList.add("whitecell");
        k++;
    }
    k = row - 1
    while (k >= 0 && !(table.rows[k].cells[col].classList.contains("blackcell"))) {
        table.rows[k].cells[col].classList.remove("yellowcell");
        table.rows[k].cells[col].classList.add("whitecell");
        k--;
    }
    k = col + 1
    while (k < table.rows.length && !(table.rows[row].cells[k].classList.contains("blackcell"))) {
        table.rows[row].cells[k].classList.remove("yellowcell");
        table.rows[row].cells[k].classList.add("whitecell");
        k++;
    }
    k = col - 1
    while (k >= 0 && !(table.rows[row].cells[k].classList.contains("blackcell"))) {
        table.rows[row].cells[k].classList.remove("yellowcell");
        table.rows[row].cells[k].classList.add("whitecell");
        k--;
    }

    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (table.rows[i].cells[j].innerHTML == lightbulb) {
                addYellowTile(i, j);
            }
        }
    }
}


// Saving and Loading
const saveButton = document.querySelector("#save");
saveButton.addEventListener("click", saveGame);

function saveGame() {
    var save = {
        def: table.innerHTML,
    };
    localStorage.setItem("save", JSON.stringify(save));
}

const loadButton = document.querySelector("#load");
loadButton.addEventListener("click", loadGame);

function loadGame() {
    explanation.innerHTML = ""
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.def !== "undefined") table.innerHTML = savegame.def;
    var cells = document.querySelectorAll(".cell");
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function (e) {
            if (e.target.matches('td') && e.target.innerHTML == "" && e.target.className == "cell whitecell") {
                e.target.innerHTML = lightbulb
            } else {
                if (e.target.matches('i')) {
                    e.target.parentNode.innerHTML = ""
                }
            }
            saveGame()
        })
    }
}








